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

            setRooms((prev) => {
                const same =
                    prev.length === nextRooms.length &&
                    prev.every((room, i) => {
                        const next = nextRooms[i];

                        return (
                            room.id === next?.id &&
                            room.last_message === next?.last_message &&
                            room.last_timestamp === next?.last_timestamp &&
                            room.type === next?.type
                        );
                    });

                return same ? prev : nextRooms;
            });

            setActiveRoomState((prev) =>
                prev === nextActiveRoom ? prev : nextActiveRoom,
            );
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
