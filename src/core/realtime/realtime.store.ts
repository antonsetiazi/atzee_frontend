// src/core/realtime/realtime.store.ts

import { create } from "zustand";
import { ws } from "./ws";
import type { WsStatus } from "./ws";

type RealtimeMessage = Record<string, unknown> | string | null;

interface RealtimeState {
    status: WsStatus;
    lastMessage: RealtimeMessage;
    connectedAt: number | null;
    lastMessageAt: number | null;

    connect: () => void;
    disconnect: () => void;
    reconnect: () => void;
    send: (payload: unknown) => void;

    setStatus: (status: WsStatus) => void;
    setLastMessage: (message: RealtimeMessage) => void;
}

let initialized = false;

export const useRealtimeStore = create<RealtimeState>((set) => ({
    status: "idle",
    lastMessage: null,
    connectedAt: null,
    lastMessageAt: null,

    connect: () => ws.connect(),

    disconnect: () => ws.disconnect(),

    reconnect: () => ws.reconnectNow(),

    send: (payload) => ws.send(payload),

    setStatus: (status) =>
        set((state) => ({
            status,
            connectedAt:
                status === "connected" ? Date.now() : state.connectedAt,
        })),

    setLastMessage: (message) =>
        set({
            lastMessage: message,
            lastMessageAt: Date.now(),
        }),
}));

export function initRealtimeStore() {
    if (initialized) return;

    initialized = true;

    ws.subscribeStatus((status) => {
        useRealtimeStore.getState().setStatus(status);
    });

    ws.subscribeMessage((message) => {
        useRealtimeStore.getState().setLastMessage(message);
    });
}
