// src/modules/chat/hooks/useChat.ts

import { useEffect, useState } from "react";
import { chatStore } from "@/business/chat/chat.store";

export function useChat() {
    const [rooms, setRooms] = useState(chatStore.getRooms());
    const [activeRoom, setActiveRoomState] = useState<string | undefined>(
        chatStore.getActiveRoomId(),
    );

    useEffect(() => {
        const unsubscribe = chatStore.subscribe(() => {
            const nextRooms = chatStore.getRooms();
            const nextActiveRoom = chatStore.getActiveRoomId();

            // ================================
            // ✅ GUARD: prevent infinite loop
            // ================================
            setRooms((prev) => {
                const isSame =
                    prev.length === nextRooms.length &&
                    prev.every((p, i) => p.id === nextRooms[i]?.id);

                return isSame ? prev : nextRooms;
            });

            setActiveRoomState((prev) => {
                return prev === nextActiveRoom ? prev : nextActiveRoom;
            });
        });

        return unsubscribe;
    }, []);

    return {
        rooms,
        activeRoom,

        // 🔥 action
        setActiveRoom: chatStore.setActiveRoom.bind(chatStore),

        // 🔥 selectors
        getMessages: chatStore.getMessages.bind(chatStore),
        getTypingUsers: chatStore.getTypingUsers.bind(chatStore),
        getPresence: chatStore.getPresence.bind(chatStore),
        getUnread: chatStore.getUnread.bind(chatStore),
    };
}
