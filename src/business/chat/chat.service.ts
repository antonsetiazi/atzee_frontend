// src/business/chat/chat.service.ts

import { chatStore, type ChatRoom } from "./chat.store";
import { chatApi } from "@/modules/chat/api/chat.api";

/**
 * ======================================================
 * PARAM TYPES
 * ======================================================
 */
interface GetOrCreateRoomParams {
    currentUserId: string;
    targetUserId: string;
    context_type?: "service" | "booking" | "order";
    context_id?: string;
}

/**
 * ======================================================
 * PUBLIC SERVICE
 * ======================================================
 */
export const chatService = {
    getOrCreateRoom,
};

/**
 * ======================================================
 * GET OR CREATE ROOM
 * ======================================================
 *
 * Room sekarang wajib dibuat dari backend.
 * Frontend tidak generate room id lagi.
 */
async function getOrCreateRoom(
    params: GetOrCreateRoomParams,
): Promise<ChatRoom> {
    const room = await chatApi.createRoom(params);

    chatStore.setRooms([room]);

    return room as ChatRoom;
}
