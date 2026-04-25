// src/modules/notification/store/notification.store.ts

import type { Notification } from "../types/notification.types";

type Listener = (notifications: Notification[]) => void;
type ToastListener = (notifications: Notification[]) => void;

let inbox: Notification[] = [];
let toasts: Notification[] = [];

const listeners: Listener[] = [];
const toastListeners: ToastListener[] = [];

function existsById(list: Notification[], id: string) {
    return list.some((item) => item.id === id);
}

function notifyInbox() {
    listeners.forEach((listener) => listener([...inbox]));
}

function notifyToast() {
    toastListeners.forEach((listener) => listener([...toasts]));
}

export const notificationStore = {
    // =====================
    // INBOX
    // =====================
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
        notifyInbox();
    },

    addInbox(notification: Notification) {
        if (existsById(inbox, notification.id)) {
            return;
        }

        inbox.unshift(notification);
        notifyInbox();
    },

    markAsRead(id: string) {
        inbox = inbox.map((n) => (n.id === id ? { ...n, read: true } : n));
        notifyInbox();
    },

    markAllAsRead() {
        inbox = inbox.map((n) => ({
            ...n,
            read: true,
        }));
        notifyInbox();
    },

    clearInbox() {
        inbox = [];
        notifyInbox();
    },

    // =====================
    // TOAST
    // =====================
    subscribeToast(listener: ToastListener) {
        toastListeners.push(listener);
        listener([...toasts]);

        return () => {
            const index = toastListeners.indexOf(listener);
            if (index > -1) toastListeners.splice(index, 1);
        };
    },

    addToast(notification: Notification) {
        if (existsById(toasts, notification.id)) {
            return;
        }

        const last = toasts[toasts.length - 1];

        // =========================
        // GROUP SAME TITLE (5 sec)
        // =========================
        if (
            last &&
            last.title === notification.title &&
            Math.abs(
                new Date(notification.created_at).getTime() -
                    new Date(last.created_at).getTime(),
            ) < 5000
        ) {
            const count = Number(last.payload?.count || 1) + 1;

            last.title = `${count} ${notification.title}`;
            last.payload = {
                ...last.payload,
                count,
            };

            notifyToast();
            return;
        }

        toasts.push(notification);
        notifyToast();

        if (notification.duration !== 0) {
            setTimeout(() => {
                this.removeToast(notification.id);
            }, notification.duration || 3000);
        }
    },

    removeToast(id: string) {
        toasts = toasts.filter((n) => n.id !== id);
        notifyToast();
    },
};
