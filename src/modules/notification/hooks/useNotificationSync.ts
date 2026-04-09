// src/modules/notification/hooks/useNotificationSync.ts

import { useEffect } from "react";
import { notificationSync } from "../services/notification.sync";

export function useNotificationSync() {
    useEffect(() => {
        notificationSync.loadAll();
    }, []);
}
