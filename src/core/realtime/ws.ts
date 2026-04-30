// src/core/realtime/ws.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { refreshTokenApi } from "@/core/auth/api/auth.api";
import { isTokenExpired } from "@/core/auth/utils/token.utils";
import { useSessionStore } from "@/core/session/session.store";

type WsStatus =
    | "idle"
    | "connecting"
    | "connected"
    | "reconnecting"
    | "disconnected";

type MessageHandler = (data: any) => void;
type StatusHandler = (status: WsStatus) => void;

interface WsOptions {
    url?: string;
    heartbeatInterval?: number;
    reconnectBaseDelay?: number;
    reconnectMaxDelay?: number;
    reconnectMaxAttempts?: number;
}

class RealtimeWS {
    private socket: WebSocket | null = null;

    private status: WsStatus = "idle";

    private manuallyClosed = false;

    private reconnectAttempts = 0;

    private reconnectTimer: number | null = null;

    private heartbeatTimer: number | null = null;

    private queue: string[] = [];

    private messageHandlers = new Set<MessageHandler>();

    private statusHandlers = new Set<StatusHandler>();

    private refreshingPromise: Promise<boolean> | null = null;

    private readonly url: string;

    private readonly heartbeatInterval: number;

    private readonly reconnectBaseDelay: number;

    private readonly reconnectMaxDelay: number;

    private readonly reconnectMaxAttempts: number;

    constructor(options?: WsOptions) {
        this.url = options?.url ?? "ws://127.0.0.1:8000/ws/user/";

        this.heartbeatInterval = options?.heartbeatInterval ?? 25000;

        this.reconnectBaseDelay = options?.reconnectBaseDelay ?? 1000;

        this.reconnectMaxDelay = options?.reconnectMaxDelay ?? 15000;

        this.reconnectMaxAttempts = options?.reconnectMaxAttempts ?? Infinity;
    }

    // =================================================
    // PUBLIC
    // =================================================

    async connect() {
        if (
            this.socket &&
            (this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING)
        ) {
            return;
        }

        const token = await this.getValidAccessToken();

        if (!token) {
            this.updateStatus("disconnected");
            return;
        }

        this.manuallyClosed = false;

        this.updateStatus(
            this.reconnectAttempts > 0 ? "reconnecting" : "connecting",
        );

        const wsUrl = `${this.url}?token=${encodeURIComponent(token)}`;

        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            this.reconnectAttempts = 0;

            this.updateStatus("connected");

            this.startHeartbeat();

            this.flushQueue();
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.emitMessage(data);
            } catch {
                this.emitMessage(event.data);
            }
        };

        this.socket.onclose = async () => {
            this.socket = null;

            this.stopHeartbeat();

            if (this.manuallyClosed) {
                this.updateStatus("disconnected");
                return;
            }

            const refreshed = await this.tryRefreshIfNeeded();

            if (refreshed) {
                this.connect();
                return;
            }

            this.scheduleReconnect();
        };

        this.socket.onerror = () => {
            // browser usually continue to onclose
        };
    }

    disconnect() {
        this.manuallyClosed = true;

        this.clearReconnect();

        this.stopHeartbeat();

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.updateStatus("disconnected");
    }

    reconnectNow() {
        this.disconnect();

        this.manuallyClosed = false;

        this.reconnectAttempts = 0;

        this.connect();
    }

    send(payload: unknown) {
        const message =
            typeof payload === "string" ? payload : JSON.stringify(payload);

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            return;
        }

        this.queue.push(message);
    }

    getStatus() {
        return this.status;
    }

    subscribeMessage(handler: MessageHandler) {
        this.messageHandlers.add(handler);

        return () => {
            this.messageHandlers.delete(handler);
        };
    }

    subscribeStatus(handler: StatusHandler) {
        this.statusHandlers.add(handler);

        handler(this.status);

        return () => {
            this.statusHandlers.delete(handler);
        };
    }

    // =================================================
    // INTERNAL
    // =================================================

    private async getValidAccessToken() {
        const store = useSessionStore.getState();

        let token = store.accessToken;

        if (!token) return null;

        if (!isTokenExpired(token)) {
            return token;
        }

        const ok = await this.refreshAccessToken();

        if (!ok) return null;

        token = useSessionStore.getState().accessToken;

        return token ?? null;
    }

    private async tryRefreshIfNeeded() {
        const token = useSessionStore.getState().accessToken;

        if (!token) return false;

        if (!isTokenExpired(token)) {
            return false;
        }

        return this.refreshAccessToken();
    }

    private async refreshAccessToken() {
        if (this.refreshingPromise) {
            return this.refreshingPromise;
        }

        this.refreshingPromise = this.performRefresh();

        const result = await this.refreshingPromise;

        this.refreshingPromise = null;

        return result;
    }

    private async performRefresh() {
        try {
            const store = useSessionStore.getState();

            const refresh = store.refreshToken;

            if (!refresh) return false;

            const res = await refreshTokenApi(refresh);

            useSessionStore.setState({
                accessToken: res.access,
            });

            return true;
        } catch {
            useSessionStore.getState().clearSession();

            return false;
        }
    }

    private scheduleReconnect() {
        if (this.reconnectAttempts >= this.reconnectMaxAttempts) {
            this.updateStatus("disconnected");
            return;
        }

        this.reconnectAttempts += 1;

        const delay = Math.min(
            this.reconnectBaseDelay * 2 ** (this.reconnectAttempts - 1),
            this.reconnectMaxDelay,
        );

        this.clearReconnect();

        this.updateStatus("reconnecting");

        this.reconnectTimer = window.setTimeout(() => {
            this.connect();
        }, delay);
    }

    private clearReconnect() {
        if (this.reconnectTimer) {
            window.clearTimeout(this.reconnectTimer);

            this.reconnectTimer = null;
        }
    }

    private startHeartbeat() {
        this.stopHeartbeat();

        this.heartbeatTimer = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(
                    JSON.stringify({
                        type: "ping",
                        ts: Date.now(),
                    }),
                );
            }
        }, this.heartbeatInterval);
    }

    private stopHeartbeat() {
        if (this.heartbeatTimer) {
            window.clearInterval(this.heartbeatTimer);

            this.heartbeatTimer = null;
        }
    }

    private flushQueue() {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        while (this.queue.length > 0) {
            const item = this.queue.shift();

            if (item) {
                this.socket.send(item);
            }
        }
    }

    private emitMessage(data: any) {
        // console.log("[WS RAW MESSAGE]", data); // 👈 ADD INI

        this.messageHandlers.forEach((handler) => handler(data));
    }

    private updateStatus(status: WsStatus) {
        this.status = status;

        this.statusHandlers.forEach((handler) => handler(status));
    }
}

export const ws = new RealtimeWS();

export type { WsStatus, MessageHandler };
