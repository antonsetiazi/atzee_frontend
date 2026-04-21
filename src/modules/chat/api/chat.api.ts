// src/modules/chat/api/chat.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";

export const chatApi = {
    getRooms() {
        return httpGet("/chat/rooms/");
    },

    getMessages(roomId: string) {
        return httpGet(`/chat/rooms/${roomId}/messages/`);
    },

    sendMessage(roomId: string, content: string) {
        return httpPost(`/chat/rooms/${roomId}/send/`, {
            content,
        });
    },

    markRead(roomId: string) {
        return httpPost(`/chat/rooms/${roomId}/read/`);
    },

    createRoom(payload: any) {
        return httpPost("/chat/rooms/create/", payload);
    },
};
