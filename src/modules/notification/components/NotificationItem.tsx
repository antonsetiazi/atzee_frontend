// src/modules/notification/components/NotificationItem.tsx

import type { Notification } from "../types/notification.types";
import { notificationService } from "../services/notification.service";
import { getNotificationUrl } from "../services/notification.navigate";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

interface Props {
    item: Notification;
    mobile?: boolean;
}

export default function NotificationItem({ item, mobile = false }: Props) {
    const handleClick = () => {
        if (!item.read) {
            notificationService.inbox.markAsRead(item.id);
        }

        const url = getNotificationUrl(item);

        if (url) {
            SmartNavigate.go(url);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer border-b transition-colors hover:bg-[var(--color-surface-alt)] active:opacity-80 ${mobile ? "px-4 py-4" : "px-4 py-3"} `}
            style={{
                background: item.read ? "transparent" : "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
            }}
        >
            {/* Title */}
            <div
                className={`font-medium ${mobile ? "text-[15px]" : "text-sm"} `}
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {item.title}
            </div>

            {/* Message */}
            {item.message && (
                <div
                    className={`mt-1 ${mobile ? "text-sm" : "text-xs"} `}
                    style={{
                        color: "var(--text-muted)",
                    }}
                >
                    {item.message}
                </div>
            )}

            {/* Timestamp */}
            <div
                className={`mt-2 ${mobile ? "text-xs" : "text-[11px]"} `}
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
