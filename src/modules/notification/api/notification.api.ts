// src/modules/notification/api/notification.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost, httpDelete } from "@/core/http/http.client";

import type { Notification } from "../types/notification.types";

export const notificationApi = {
    async getAll(): Promise<Notification[]> {
        return httpGet<Notification[]>("/notifications/");
    },

    async create(data: {
        event?: string;
        level?: "info" | "success" | "warning" | "error";
        title: string;
        message?: string;
        entity_type?: string;
        entity_id?: string;
        payload?: any;
    }) {
        return httpPost("/notifications/create/", data);
    },

    async markRead(id: string): Promise<void> {
        await httpPost(`/notifications/${id}/read/`);
    },

    async markAllRead(): Promise<void> {
        await httpPost("/notifications/mark-all-read/");
    },

    async clearAll(): Promise<void> {
        await httpDelete("/notifications/clear/");
    },
};
