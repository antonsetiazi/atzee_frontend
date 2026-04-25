// src/modules/chat/realtime/chat.socket.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { chatStore } from "@/business/chat/chat.store";

class ChatSocket {
    private socket: WebSocket | null = null;

    connect(roomId: string, token: string) {
        this.socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/${roomId}/?token=${token}`,
        );

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            this.handle(data);
        };

        this.socket.onopen = () => {
            console.log("🟢 CHAT WS OPEN:", roomId);
        };

        this.socket.onerror = (e) => {
            console.log("🔴 CHAT WS ERROR:", e);
        };

        this.socket.onclose = (e) => {
            console.log("🔴 CHAT WS CLOSE:", e.code, e.reason);
        };
    }

    private handle(event: any) {
        switch (event.type) {
            case "chat.message":
                chatStore.addMessage(event.room_id, {
                    id: event.id,
                    room_id: event.room_id,
                    sender_id: event.sender_id,
                    type: "text",
                    content: event.content,
                    created_at: event.created_at,
                    status: event.status,
                });
                break;

            case "chat.typing":
                chatStore.setTyping(event.room_id, event.user_id, true);
                break;

            case "chat.read":
                chatStore.updateMessageStatus(
                    event.room_id,
                    event.message_id,
                    "read",
                );
                break;
        }
    }

    send(payload: any) {
        this.socket?.send(JSON.stringify(payload));
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
    }
}

export const chatSocket = new ChatSocket();
