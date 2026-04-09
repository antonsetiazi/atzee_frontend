// src/modules/notification/store/notification.store.ts

import type { Notification } from "../types/notification.types";

type Listener = (notifications: Notification[]) => void;

let inbox: Notification[] = [];
let toasts: Notification[] = [];

const listeners: Listener[] = [];

function notify() {
    listeners.forEach((listener) => {
        listener([...inbox]);
    });
}

export const notificationStore = {
    subscribe(listener: Listener) {
        listeners.push(listener);
        listener([...inbox]);

        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) listeners.splice(index, 1);
        };
    },

    setInbox(items: Notification[]) {
        inbox = items;
        notify();
    },

    addInbox(notification: Notification) {
        inbox.unshift(notification);
        notify();
    },

    addToast(notification: Notification) {
        toasts.push(notification);

        if (notification.duration !== 0) {
            setTimeout(() => {
                this.removeToast(notification.id);
            }, notification.duration || 3000);
        }
    },

    removeToast(id: string) {
        toasts = toasts.filter((n) => n.id !== id);
    },

    markAsRead(id: string) {
        inbox = inbox.map((n) => (n.id === id ? { ...n, read: true } : n));
        notify();
    },

    markAllAsRead() {
        inbox = inbox.map((n) => ({
            ...n,
            read: true,
        }));
        notify();
    },

    clearInbox() {
        inbox = [];
        notify();
    },
};
