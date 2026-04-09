// src/modules/notification/hooks/useNotifications

import { useEffect, useState } from "react";
import { notificationStore } from "../store/notification.store";
import type { Notification } from "../types/notification.types";

export function useNotifications() {
    const [items, setItems] = useState<Notification[]>([]);

    useEffect(() => {
        return notificationStore.subscribe(setItems);
    }, []);

    return items;
}
