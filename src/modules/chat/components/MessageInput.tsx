// src/modules/chat/components/MessageInput.tsx

import { useState } from "react";
import { socketClient } from "@/core/realtime/socket.client";
import { chatStore } from "@/business/chat/chat.store";

export default function MessageInput({ roomId }: { roomId: string }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;

        const tempId = `temp-${Date.now()}`;

        // optimistic UI
        chatStore.addMessage(roomId, {
            id: tempId,
            room_id: roomId,
            sender_id: "user_1",
            type: "text",
            content: text,
            created_at: new Date().toISOString(),
            status: "sending",
        });

        socketClient.send({
            type: "chat.send",
            room_id: roomId,
            content: text,
        });

        setText("");
    };

    const handleTyping = () => {
        socketClient.send({
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
