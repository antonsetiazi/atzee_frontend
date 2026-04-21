// src/business/chat/chat.service.ts

import { chatStore, type ChatRoom } from "./chat.store";

/**
 * PARAMS
 */
interface GetOrCreateRoomParams {
    currentUserId: string;
    currentUserName?: string;

    targetUserId: string;
    targetUserName?: string;

    context_type?: "service" | "booking" | "order";
    context_id?: string;
}

/**
 * 🔥 PUBLIC API
 */
export const chatService = {
    getOrCreateRoom,
    upgradeToTransactional,
};

/**
 * 🔧 UTILS
 */
function generateRoomId() {
    return "room_" + Math.random().toString(36).slice(2);
}

/**
 * 🔥 GET OR CREATE ROOM (COMPATIBLE DENGAN SYSTEM KAMU)
 */
function getOrCreateRoom(params: GetOrCreateRoomParams): ChatRoom {
    const {
        currentUserId,
        currentUserName,
        targetUserId,
        targetUserName,
        context_type,
        context_id,
    } = params;

    const rooms = chatStore.getRooms();

    /**
     * 🔍 FIND EXISTING ROOM
     */
    const existing = rooms.find((room) => {
        const isSameParticipants =
            room.participants.includes(currentUserId) &&
            room.participants.includes(targetUserId);

        const isSameContext =
            room.context_type === context_type &&
            room.context_id === context_id;

        /**
         * ❗ IMPORTANT
         * hanya reuse kalau:
         * - direct (pre-transaction)
         * - BELUM jadi transactional
         */
        const isReusable = room.type === "direct";

        return isSameParticipants && isSameContext && isReusable;
    });

    if (existing) return existing;

    /**
     * 🆕 CREATE NEW ROOM
     */
    const newRoom: ChatRoom = {
        id: generateRoomId(),
        type: "direct",
        participants: [currentUserId, targetUserId],
        participants_detail: [
            {
                id: currentUserId,
                name: currentUserName || currentUserId,
                role: "user",
            },
            {
                id: targetUserId,
                name: targetUserName || targetUserId,
                role: "partner",
            },
        ],

        context_type,
        context_id,

        last_message: "",
        last_timestamp: new Date().toISOString(),
    };

    chatStore.createRoom(newRoom);

    /**
     * 🤖 AUTO SYSTEM MESSAGE
     */
    chatStore.addSystemMessage(newRoom.id, "Percakapan dimulai");

    return newRoom;
}

function upgradeToTransactional(
    roomId: string,
    context_type: "order" | "booking",
    context_id: string,
) {
    const rooms = chatStore.getRooms();
    const room = rooms.find((r) => r.id === roomId);

    if (!room) return;

    // 🔥 upgrade
    room.type = "transactional";
    room.context_type = context_type;
    room.context_id = context_id;

    /**
     * 🤖 SYSTEM MESSAGE
     */
    chatStore.addSystemMessage(
        roomId,
        "Transaksi telah dibuat dari percakapan ini",
    );

    // trigger re-render
    chatStore.setRooms([room]);
}
