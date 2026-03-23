// src/core/notification/notification.types.ts

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    title?: string;
    message: string;
    type?: NotificationType;
    duration?: number; // ms
}
