// src/modules/notification/notification.init.ts

import { notificationRealtimeHandler } from "./realtime/notification.handler";

export function initNotificationRealtime() {
    notificationRealtimeHandler.init();
}
