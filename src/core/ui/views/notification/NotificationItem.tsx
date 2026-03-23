// src/core/ui/views/notification/NotificationItem.tsx

import type { Notification } from "@/core/notification/notification.types";
import { notificationStore } from "@/core/notification/notification.store";

interface Props {
    notification: Notification;
}

export default function NotificationItem({ notification }: Props) {
    const { id, message, type = "info" } = notification;

    const colorMap = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
    };

    return (
        <div
            className={`
                ${colorMap[type]}
                text-white px-4 py-3 rounded-xl shadow-md
                flex justify-between items-center gap-4
                animate-slide-in
            `}
        >
            <span>{message}</span>

            <button
                onClick={() => notificationStore.remove(id)}
                className="text-white/80 hover:text-white"
            >
                ✕
            </button>
        </div>
    );
}
