// src/modules/notification/realtime/notification.handler.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ws } from "@/core/realtime/ws";
import { notificationStore } from "../store/notification.store";
import type { Notification } from "../types/notification.types";

class NotificationRealtimeHandler {
    private initialized = false;

    init() {
        if (this.initialized) return;

        this.initialized = true;

        ws.subscribeMessage((event: any) => {
            this.handle(event);
        });
    }

    private handle(event: any) {
        if (!event?.type) return;

        switch (event.type) {
            /**
             * backend:
             * {
             *   type: "notification",
             *   data: {...}
             * }
             */
            case "notification":
                this.onNotification(event.data);
                break;

            /**
             * optional bulk notifications
             */
            case "notifications":
                this.onMany(event.data);
                break;

            default:
                break;
        }
    }

    private onNotification(raw: any) {
        const item = this.normalize(raw);

        notificationStore.addInbox(item);

        notificationStore.addToast({
            ...item,
            duration: 3500,
        });
    }

    private onMany(items: any[]) {
        if (!Array.isArray(items)) return;

        items.forEach((row) => {
            this.onNotification(row);
        });
    }

    private normalize(raw: any): Notification {
        return {
            id: String(raw?.id ?? crypto.randomUUID()),

            title: String(raw?.title ?? "Notification"),

            message: raw?.message ? String(raw.message) : "",

            type:
                raw?.type === "success" ||
                raw?.type === "error" ||
                raw?.type === "warning"
                    ? raw.type
                    : "info",

            read: Boolean(raw?.read ?? false),

            created_at: String(raw?.created_at ?? new Date().toISOString()),

            duration: raw?.duration ? Number(raw.duration) : undefined,

            event: raw?.event ? String(raw.event) : undefined,

            entity_type: raw?.entity_type,

            entity_id: raw?.entity_id,

            payload:
                typeof raw?.payload === "object" && raw.payload !== null
                    ? raw.payload
                    : {},
        };
    }
}

export const notificationRealtimeHandler = new NotificationRealtimeHandler();
