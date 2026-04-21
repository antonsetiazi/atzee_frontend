// src/modules/chat/utils/chat.user.ts

import type { ChatRoom } from "@/business/chat/chat.store";

export function getOtherParticipant(room: ChatRoom, currentUserId: string) {
    const otherId =
        room.participants.find((p) => p !== currentUserId) ||
        room.participants[0];

    return (
        room.participants_detail?.find((p) => p.id === otherId) || {
            id: otherId,
            name: otherId,
        }
    );
}
