// src/modules/notification/services/notification.sync.ts

import { notificationApi } from "../api/notification.api";
import { notificationStore } from "../store/notification.store";

const knownIds = new Set<string>();
let initialized = false;

export const notificationSync = {
    async loadAll() {
        const items = await notificationApi.getAll();

        // selalu update inbox
        notificationStore.setInbox(items);

        /**
         * FIRST LOAD:
         * isi knownIds saja
         * jangan munculkan toast
         */
        if (!initialized) {
            for (const item of items) {
                knownIds.add(item.id);
            }

            initialized = true;
            return;
        }

        /**
         * next sync:
         * hanya notif baru yang jadi toast
         */
        for (const item of items) {
            if (!knownIds.has(item.id)) {
                knownIds.add(item.id);

                notificationStore.addToast({
                    ...item,
                    duration: 3500,
                });
            }
        }

        /**
         * limit memory
         */
        if (knownIds.size > 200) {
            const sliced = Array.from(knownIds).slice(-100);

            knownIds.clear();

            sliced.forEach((id) => knownIds.add(id));
        }
    },
};
