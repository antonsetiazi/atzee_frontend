// src/core/ui/views/notification/NotificationContainer.tsx

import { useEffect, useState } from "react";
import { notificationStore } from "@/core/notification/notification.store";
import type { Notification } from "@/core/notification/notification.types";
import NotificationItem from "./NotificationItem";

export default function NotificationContainer() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        return notificationStore.subscribe(setNotifications);
    }, []);

    return (
        <div
            className="
                fixed top-4 right-4 z-[9999]
                flex flex-col gap-3 w-[320px]
            "
        >
            {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
            ))}
        </div>
    );
}
