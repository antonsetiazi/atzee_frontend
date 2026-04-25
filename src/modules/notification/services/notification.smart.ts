// src/modules/notification/services/notification.smart.ts

import { notificationSync } from "./notification.sync";
import { ws } from "@/core/realtime/ws";

let timer: number | null = null;
let lastActivity = Date.now();

const ACTIVE_INTERVAL = 10000;
const BLUR_INTERVAL = 60000;
const IDLE_INTERVAL = 120000;
const IDLE_LIMIT = 120000;

function clearTimer() {
    if (timer) {
        window.clearTimeout(timer);
        timer = null;
    }
}

function isRealtimeConnected() {
    return ws.getStatus() === "connected";
}

function getNextInterval() {
    const hidden = document.hidden;
    const idle = Date.now() - lastActivity > IDLE_LIMIT;

    if (hidden) return BLUR_INTERVAL;
    if (idle) return IDLE_INTERVAL;

    return ACTIVE_INTERVAL;
}

async function runLoop() {
    /**
     * jika realtime hidup,
     * polling skip
     */
    if (isRealtimeConnected()) {
        schedule();
        return;
    }

    try {
        await notificationSync.loadAll();
    } catch {
        //
    }

    schedule();
}

function schedule() {
    clearTimer();

    /**
     * realtime hidup:
     * polling pelan sekali (fallback)
     */
    const next = isRealtimeConnected()
        ? 300000 // 5 menit sekali backup sync
        : getNextInterval();

    timer = window.setTimeout(runLoop, next);
}

function markActive() {
    lastActivity = Date.now();
}

export const notificationSmart = {
    start() {
        markActive();

        /**
         * first load inbox tetap jalan
         */
        notificationSync.loadAll();
        schedule();

        window.addEventListener("mousemove", markActive);
        window.addEventListener("keydown", markActive);
        window.addEventListener("click", markActive);

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                notificationSync.loadAll();
            }

            schedule();
        });

        window.addEventListener("focus", () => {
            notificationSync.loadAll();
            schedule();
        });
    },

    stop() {
        clearTimer();

        window.removeEventListener("mousemove", markActive);
        window.removeEventListener("keydown", markActive);
        window.removeEventListener("click", markActive);
    },

    refreshNow() {
        notificationSync.loadAll();
        schedule();
    },
};
