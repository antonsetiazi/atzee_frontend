// src/modules/notification/services/notification.sync.ts

import { notificationApi } from "../api/notification.api";
import { notificationStore } from "../store/notification.store";

export const notificationSync = {
    async loadAll() {
        const items = await notificationApi.getAll();
        notificationStore.setInbox(items);
    },
};
