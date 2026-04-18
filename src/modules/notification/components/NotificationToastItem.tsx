// src/modules/notification/components/NotificationToastItem.tsx

import type { Notification } from "../types/notification.types";
import { useNavigate } from "react-router-dom";
import { getNotificationUrl } from "../services/notification.navigate";
import { notificationStore } from "../store/notification.store";

interface Props {
    item: Notification;
}

export default function NotificationToastItem({ item }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        const url = getNotificationUrl(item);

        // hapus toast saat diklik
        notificationStore.removeToast(item.id);

        if (url) {
            navigate(url);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="w-80 rounded-xl p-4 shadow-xl border animate-slide-in"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                {item.title}
            </div>

            {item.message && (
                <div
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                >
                    {item.message}
                </div>
            )}
        </div>
    );
}
