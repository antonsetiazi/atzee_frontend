// src/modules/notification/hooks/useToastNotifications.ts

import { useEffect, useState } from "react";
import type { Notification } from "../types/notification.types";
import { notificationStore } from "../store/notification.store";

export function useToastNotifications() {
    const [items, setItems] = useState<Notification[]>([]);

    useEffect(() => {
        return notificationStore.subscribeToast(setItems);
    }, []);

    return items;
}
