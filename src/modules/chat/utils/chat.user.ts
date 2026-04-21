// src/modules/chat/utils/chat.user.ts

import type { ChatParticipant, ChatRoom } from "@/business/chat/chat.store";

export function getOtherParticipant(
    room: ChatRoom,
    currentUserId: string,
): ChatParticipant | null {
    const participants = room.participants_detail || [];

    if (!participants.length) return null;

    const me = String(currentUserId);

    const other =
        participants.find((p) => String(p.id) !== me) || participants[0];

    return other || null;
}
