// src/core/ui/components/notifications/notifications.types.ts

export interface NotificationItemData {
    id: string;
    title: string;
    description?: string;
    created_at?: string;
    read?: boolean;
}
