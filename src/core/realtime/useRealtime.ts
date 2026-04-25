// src/core/realtime/useRealtime.ts
import { useEffect } from "react";
import { useRealtimeStore, initRealtimeStore } from "./realtime.store";
import { useSessionStore } from "@/core/session/session.store";

interface UseRealtimeReturn {
    status:
        | "idle"
        | "connecting"
        | "connected"
        | "reconnecting"
        | "disconnected";
    isConnected: boolean;
    lastMessage: Record<string, unknown> | string | null;
    connectedAt: number | null;
    lastMessageAt: number | null;

    connect: () => void;
    disconnect: () => void;
    reconnect: () => void;
    send: (payload: unknown) => void;
}

export function useRealtime(autoConnect = true): UseRealtimeReturn {
    const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

    const isHydrated = useSessionStore((state) => state.isHydrated);

    const {
        status,
        lastMessage,
        connectedAt,
        lastMessageAt,
        connect,
        disconnect,
        reconnect,
        send,
    } = useRealtimeStore();

    useEffect(() => {
        initRealtimeStore();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        if (!autoConnect) return;

        if (isAuthenticated) {
            connect();
        } else {
            disconnect();
        }
    }, [isHydrated, isAuthenticated, autoConnect, connect, disconnect]);

    useEffect(() => {
        return () => {
            // optional cleanup on unmount
        };
    }, []);

    return {
        status,
        isConnected: status === "connected",
        lastMessage,
        connectedAt,
        lastMessageAt,

        connect,
        disconnect,
        reconnect,
        send,
    };
}
