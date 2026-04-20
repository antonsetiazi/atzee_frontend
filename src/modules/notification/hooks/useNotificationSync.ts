// src/modules/notification/hooks/useNotificationSync.ts

import { useEffect } from "react";
import { notificationSmart } from "../services/notification.smart";

export function useNotificationSync() {
    useEffect(() => {
        notificationSmart.start();

        return () => {
            notificationSmart.stop();
        };
    }, []);
}
