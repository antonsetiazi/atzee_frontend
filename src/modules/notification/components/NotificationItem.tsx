// src/modules/notification/components/NotificationItem.tsx

import type { Notification } from "../types/notification.types";
import { notificationService } from "../services/notification.service";
import { useNavigate } from "react-router-dom";
import { getNotificationUrl } from "../services/notification.navigate";

interface Props {
    item: Notification;
}

export default function NotificationItem({ item }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!item.read) {
            notificationService.inbox.markAsRead(item.id);
        }

        const url = getNotificationUrl(item);

        if (url) {
            navigate(url);
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
    const min = Math.floor(diffMs / 60000);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (min < 1) return "Just now";
    if (min < 60) return `${min}m ago`;
    if (hour < 24) return `${hour}h ago`;
    if (day === 1) return "Yesterday";
    return `${day}d ago`;
}
