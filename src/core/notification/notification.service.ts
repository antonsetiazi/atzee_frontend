// src/core/notification/notification.service.ts

import { notificationStore } from "./notification.store";
import type { NotificationType } from "./notification.types";

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

export const notificationService = {
    show(message: string, type: NotificationType = "info", title?: string) {
        notificationStore.add({
            id: generateId(),
            title,
            message,
            type,
        });
    },

    success(msg: string) {
        this.show(msg, "success");
    },

    error(msg: string) {
        this.show(msg, "error");
    },

    info(msg: string) {
        this.show(msg, "info");
    },

    warning(msg: string) {
        this.show(msg, "warning");
    },
};
