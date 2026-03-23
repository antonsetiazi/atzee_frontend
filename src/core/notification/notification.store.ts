// src/core/notification/notification.store.ts

import type { Notification } from "./notification.types";

type Listener = (notifications: Notification[]) => void;

let notifications: Notification[] = [];
const listeners: Listener[] = [];

function notify() {
    listeners.forEach((l) => l([...notifications]));
}

export const notificationStore = {
    subscribe(listener: Listener) {
        listeners.push(listener);
        listener([...notifications]);

        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) listeners.splice(index, 1);
        };
    },

    add(notification: Notification) {
        notifications.push(notification);
        notify();

        if (notification.duration !== 0) {
            setTimeout(() => {
                this.remove(notification.id);
            }, notification.duration || 3000);
        }
    },

    remove(id: string) {
        notifications = notifications.filter((n) => n.id !== id);
        notify();
    },

    clear() {
        notifications = [];
        notify();
    },
};
