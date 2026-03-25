// src/core/realtime/socket.client.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { chatStore } from "@/business/chat/chat.store";

type SocketEvent =
    | { type: "chat.message"; room_id: string; message: any }
    | { type: "chat.typing"; room_id: string; user_id: string }
    | { type: "chat.read"; room_id: string; message_id: string }
    | { type: "presence.update"; user_id: string; is_online: boolean }
    | { type: "system.ping" };

class SocketClient {
    private socket?: WebSocket;
    private url: string = "wss://api.yourapp.com/ws";

    private reconnectInterval = 2000;
    private maxReconnectInterval = 15000;
    private currentReconnectInterval = this.reconnectInterval;

    private isConnected = false;
    private manuallyClosed = false;

    private messageQueue: any[] = [];

    private heartbeatInterval?: ReturnType<typeof setInterval>;

    // ================================
    // 🔌 CONNECT
    // ================================
    connect(token: string) {
        this.manuallyClosed = false;

        this.socket = new WebSocket(`${this.url}?token=${token}`);

        this.socket.onopen = () => {
            console.log("[Socket] Connected");
            this.isConnected = true;

            this.flushQueue();
            this.startHeartbeat();

            // reset reconnect interval
            this.currentReconnectInterval = this.reconnectInterval;
        };

        this.socket.onmessage = (event) => {
            const data: SocketEvent = JSON.parse(event.data);
            this.handleEvent(data);
        };

        this.socket.onclose = () => {
            console.log("[Socket] Disconnected");
            this.isConnected = false;
            this.stopHeartbeat();

            if (!this.manuallyClosed) {
                this.reconnect(token);
            }
        };

        this.socket.onerror = (err) => {
            console.error("[Socket] Error", err);
        };
    }

    // ================================
    // 🔁 RECONNECT
    // ================================
    private reconnect(token: string) {
        console.log(
            `[Socket] Reconnecting in ${this.currentReconnectInterval}ms`,
        );

        setTimeout(() => {
            this.connect(token);

            // exponential backoff
            this.currentReconnectInterval = Math.min(
                this.currentReconnectInterval * 2,
                this.maxReconnectInterval,
            );
        }, this.currentReconnectInterval);
    }

    // ================================
    // ❌ DISCONNECT
    // ================================
    disconnect() {
        this.manuallyClosed = true;
        this.stopHeartbeat();
        this.socket?.close();
    }

    // ================================
    // 📤 SEND
    // ================================
    send(data: any) {
        if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            // queue jika belum connect
            this.messageQueue.push(data);
        }
    }

    private flushQueue() {
        while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            this.send(msg);
        }
    }

    // ================================
    // ❤️ HEARTBEAT
    // ================================
    private startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            this.send({ type: "system.ping" });
        }, 25000);
    }

    private stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
    }

    // ================================
    // ⚡ EVENT HANDLER
    // ================================
    private handleEvent(event: SocketEvent) {
        switch (event.type) {
            case "chat.message":
                chatStore.addMessage(event.room_id, event.message);
                break;

            case "chat.typing":
                chatStore.setTyping(event.room_id, event.user_id, true);

                // auto clear typing setelah 3 detik
                setTimeout(() => {
                    chatStore.setTyping(event.room_id, event.user_id, false);
                }, 3000);
                break;

            case "chat.read":
                chatStore.updateMessageStatus(
                    event.room_id,
                    event.message_id,
                    "read",
                );
                break;

            case "presence.update":
                chatStore.setPresence({
                    user_id: event.user_id,
                    is_online: event.is_online,
                });
                break;

            case "system.ping":
                // optional: bisa dipakai untuk latency check
                break;

            default:
                console.warn("[Socket] Unknown event", event);
        }
    }
}

export const socketClient = new SocketClient();
