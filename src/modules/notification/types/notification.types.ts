// src/modules/notification/types/notification.types.ts

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    title: string;
    message?: string;
    type: NotificationType;
    read: boolean;
    created_at: string;
    duration?: number;
}
