// src/core/realtime/realtime.registry.ts

import { initChatRealtime } from "@/modules/chat/chat.init";
import { initNotificationRealtime } from "@/modules/notification/notification.init";

export function initRealtimeModules() {
    initChatRealtime();
    initNotificationRealtime();
    // nanti:
    // initOrderRealtime()
}
