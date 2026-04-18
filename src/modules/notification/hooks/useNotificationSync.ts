// src/modules/notification/hooks/useNotificationSync.ts

import { useEffect } from "react";
import { notificationSync } from "../services/notification.sync";

export function useNotificationSync() {
    useEffect(() => {
        // first load
        notificationSync.loadAll();

        // auto refresh tiap 10 detik
        const timer = setInterval(() => {
            notificationSync.loadAll();
        }, 10000);

        return () => clearInterval(timer);
    }, []);
}
