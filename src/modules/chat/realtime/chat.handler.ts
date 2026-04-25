// src/modules/chat/realtime/chat.handler.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ws } from "@/core/realtime/ws";
import { chatStore } from "@/business/chat/chat.store";
import { useSessionStore } from "@/core/session/session.store";

/**
 * ======================================================
 * CHAT REALTIME HANDLER
 * ======================================================
 *
 * Bridge antara websocket global → chat store
 * Semua event chat diproses di sini
 */

class ChatRealtimeHandler {
    private initialized = false;

    /**
     * ======================================================
     * INIT
     * ======================================================
     */
    init() {
        if (this.initialized) return;

        this.initialized = true;

        ws.subscribeMessage((event: any) => {
            this.handle(event);
        });
    }

    /**
     * ======================================================
     * MAIN ROUTER
     * ======================================================
     */
    private handle(event: any) {
        console.log("[CHAT HANDLER]", event);

        if (!event?.type) return;

        switch (event.type) {
            // ==============================
            // 💬 NEW MESSAGE
            // ==============================
            case "chat.message":
                this.onMessage(event);
                break;

            // ==============================
            // ✍️ TYPING
            // ==============================
            case "chat.typing":
                this.onTyping(event);
                break;

            // ==============================
            // 👁 READ RECEIPT
            // ==============================
            case "chat.read":
                this.onRead(event);
                break;

            // ==============================
            // 🟢 PRESENCE
            // ==============================
            case "presence.update":
                this.onPresence(event);
                break;

            default:
                // ignore non-chat event
                break;
        }
    }

    /**
     * ======================================================
     * CHAT MESSAGE
     * ======================================================
     */
    private onMessage(payload: any) {
        const { room_id, id, sender_id, content, created_at, status } = payload;

        if (!room_id || !id) return;

        // 🔥 GET CURRENT USER
        const currentUserId = useSessionStore.getState?.().user?.id;

        // 🔥 IGNORE ECHO MESSAGE FROM SELF
        if (String(sender_id) === String(currentUserId)) return;

        chatStore.addMessage(room_id, {
            id,
            room_id,
            sender_id,
            type: "text",
            content,
            created_at,
            status: status ?? "delivered",
        });
    }

    /**
     * ======================================================
     * TYPING
     * ======================================================
     */
    private typingTimers = new Map<string, any>();
    private onTyping(payload: any) {
        const { room_id, user_id } = payload;

        if (!room_id || !user_id) return;

        chatStore.setTyping(room_id, user_id, true);

        const key = `${room_id}-${user_id}`;

        const old = this.typingTimers.get(key);
        if (old) clearTimeout(old);

        const timer = setTimeout(() => {
            chatStore.setTyping(room_id, user_id, false);
        }, 2000);

        this.typingTimers.set(key, timer);
    }

    /**
     * ======================================================
     * READ RECEIPT
     * ======================================================
     */
    private onRead(event: any) {
        const { room_id, message_id } = event;

        if (!room_id || !message_id) return;

        chatStore.updateMessageStatus(room_id, message_id, "read");
    }

    /**
     * ======================================================
     * PRESENCE
     * ======================================================
     */
    private onPresence(event: any) {
        const { user_id, is_online } = event;

        if (!user_id) return;

        chatStore.setPresence({
            user_id,
            is_online,
        });
    }
}

/**
 * SINGLETON
 */
export const chatRealtimeHandler = new ChatRealtimeHandler();
