// src/modules/chat/components/MessageInput.tsx

import { useState } from "react";
import { ws } from "@/core/realtime/ws";
import { chatStore } from "@/business/chat/chat.store";
import { useSessionStore } from "@/core/session/session.store";
import { chatApi } from "../api/chat.api";

export default function MessageInput({ roomId }: { roomId: string }) {
    const { user } = useSessionStore();
    const currentUserId = String(user?.id || "");
    const [text, setText] = useState("");

    const handleSend = async () => {
        const messageText = text.trim();

        if (!messageText) return;

        const tempId = `temp-${Date.now()}`;

        chatStore.addMessage(roomId, {
            id: tempId,
            room_id: roomId,
            sender_id: currentUserId,
            type: "text",
            content: messageText,
            created_at: new Date().toISOString(),
            status: "sending",
        });

        setText("");

        try {
            const realMsg = await chatApi.sendMessage(roomId, messageText);

            ws.send({
                type: "chat.message",
                room_id: roomId,
                content: messageText,
            });

            chatStore.replaceTempMessage(roomId, tempId, realMsg);
        } catch {
            chatStore.updateMessageStatus(roomId, tempId, "failed");

            setText(messageText);
        }
    };

    const handleTyping = () => {
        ws.send({
            type: "chat.typing",
            room_id: roomId,
        });
    };

    return (
        <div
            className="p-3 flex gap-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
        >
            <input
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    handleTyping();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full outline-none"
                style={{
                    background: "var(--color-surface-alt)",
                    color: "var(--text-primary)",
                }}
            />

            <button
                onClick={handleSend}
                className="px-5 py-2 rounded-full font-medium text-white"
                style={{ background: "var(--color-primary)" }}
            >
                Send
            </button>
        </div>
    );
}
