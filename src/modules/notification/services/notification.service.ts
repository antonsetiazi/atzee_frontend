// src/modules/notification/services/notification.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { notificationApi } from "../api/notification.api";
import { notificationStore } from "../store/notification.store";
import type {
    // Notification,
    NotificationType,
} from "../types/notification.types";

import { useFeedbackStore } from "@/core/feedback/feedback.store";

// function generateId() {
//     return Math.random().toString(36).substring(2, 9);
// }

export const notificationService = {
    toast: {
        success(message: string, title = "Success") {
            useFeedbackStore.getState().push({
                type: "success",
                title,
                message,
            });
        },

        error(message: string, title = "Error") {
            useFeedbackStore.getState().push({
                type: "error",
                title,
                message,
            });
        },

        info(message: string, title = "Info") {
            useFeedbackStore.getState().push({
                type: "info",
                title,
                message,
            });
        },

        warning(message: string, title = "Warning") {
            useFeedbackStore.getState().push({
                type: "warning",
                title,
                message,
            });
        },
    },

    inbox: {
        async add(data: {
            title: string;
            message?: string;
            type?: NotificationType;
            event?: string;
            entity_type?: string;
            entity_id?: string;
            payload?: any;
        }) {
            const res = await notificationApi.create({
                event: data.event || "manual",
                level: data.type || "info",
                title: data.title,
                message: data.message,
                entity_type: data.entity_type,
                entity_id: data.entity_id,
                payload: data.payload,
            });

            // OPTIONAL: langsung update UI tanpa refetch
            notificationStore.addInbox(res);
        },

        async markAsRead(id: string) {
            notificationStore.markAsRead(id);
            await notificationApi.markRead(id);
        },

        async markAllAsRead() {
            notificationStore.markAllAsRead();
            await notificationApi.markAllRead();
        },

        async clearAll() {
            notificationStore.clearInbox();
            await notificationApi.clearAll();
        },
    },
};
