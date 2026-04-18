// src/modules/notification/types/notification.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    title: string;
    message?: string;
    type: NotificationType;
    read: boolean;
    created_at: string;
    duration?: number;

    // =========================
    // Smart Navigation Ready
    // =========================
    event?: string;

    entity_type?: "order" | "booking" | "wallet" | "partner";

    entity_id?: string | number;

    payload?: Record<string, any>;
}
