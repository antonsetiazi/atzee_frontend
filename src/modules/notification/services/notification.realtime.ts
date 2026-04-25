// src/modules/notification/services/notification.realtime.ts

import { useRealtimeStore } from "@/core/realtime";
import { notificationStore } from "../store/notification.store";
import { notificationSmart } from "./notification.smart";
import type { Notification } from "../types/notification.types";

let initialized = false;

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function normalizeNotification(raw: Record<string, unknown>): Notification {
    return {
        id: String(raw.id ?? crypto.randomUUID()),
        title: String(raw.title ?? "Notification"),
        message: String(raw.message ?? ""),
        type:
            raw.type === "success" ||
            raw.type === "error" ||
            raw.type === "warning"
                ? raw.type
                : "info",
        read: Boolean(raw.read ?? false),
        created_at: String(raw.created_at ?? new Date().toISOString()),
        event: raw.event ? String(raw.event) : undefined,
        entity_type: raw.entity_type as
            | "order"
            | "booking"
            | "wallet"
            | "partner"
            | undefined,
        entity_id: raw.entity_id as string | number | undefined,
        payload: isObject(raw.payload) ? raw.payload : {},
    };
}

function pushRealtimeNotification(item: Notification) {
    notificationStore.addInbox(item);

    notificationStore.addToast({
        ...item,
        duration: 3500,
    });
}

function handleRealtimeMessage(message: unknown) {
    if (!isObject(message)) return;

    const type = message.type;

    if (type === "notification") {
        const data = isObject(message.data) ? message.data : message;

        pushRealtimeNotification(normalizeNotification(data));

        return;
    }

    if (type === "notifications" && Array.isArray(message.data)) {
        for (const row of message.data) {
            if (isObject(row)) {
                pushRealtimeNotification(normalizeNotification(row));
            }
        }

        return;
    }

    if (type === "order_updated" || type === "wallet_updated") {
        notificationSmart.refreshNow();
    }
}

export function registerNotificationRealtime() {
    if (initialized) return;

    initialized = true;

    useRealtimeStore.subscribe((state) => {
        const message = state.lastMessage;

        if (!message) return;

        handleRealtimeMessage(message);
    });
}
