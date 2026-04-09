// src/modules/notification/components/NotificationItem.tsx

import type { Notification } from "../types/notification.types";
import { notificationService } from "../services/notification.service";

interface Props {
    item: Notification;
}

export default function NotificationItem({ item }: Props) {
    const handleClick = () => {
        if (!item.read) {
            notificationService.inbox.markAsRead(item.id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="px-4 py-3 cursor-pointer transition-colors border-b"
            style={{
                background: item.read
                    ? "transparent"
                    : "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
            }}
        >
            {/* Title */}
            <div
                className="text-sm font-medium"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {item.title}
            </div>

            {/* Message */}
            {item.message && (
                <div
                    className="text-xs mt-1"
                    style={{
                        color: "var(--text-muted)",
                    }}
                >
                    {item.message}
                </div>
            )}

            {/* Timestamp */}
            <div
                className="text-[11px] mt-2"
                style={{
                    color: "var(--text-muted)",
                    opacity: 0.7,
                }}
            >
                {formatRelativeTime(item.created_at)}
            </div>
        </div>
    );
}

/**
 * Helper: format waktu relatif
 */
function formatRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} hour ago`;

    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} day ago`;
}
