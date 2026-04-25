// src/modules/chat/chat.init.ts

import { chatRealtimeHandler } from "./realtime/chat.handler";

export function initChatRealtime() {
    chatRealtimeHandler.init();
}
