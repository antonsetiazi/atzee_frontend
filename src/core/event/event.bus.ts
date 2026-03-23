// src/core/event/event.bus.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { EventMap } from "./event.types";

type EventKey = keyof EventMap;

// Base listener (lebih aman dari Function)
type BaseListener = (payload: any) => void;

type Listener<K extends EventKey> = (payload: EventMap[K]) => void;

// 🔥 gunakan base listener
const listeners: Partial<Record<EventKey, BaseListener[]>> = {};

export const eventBus = {
    on<K extends EventKey>(event: K, callback: Listener<K>) {
        if (!listeners[event]) {
            listeners[event] = [];
        }

        listeners[event]!.push(callback as BaseListener);

        return () => {
            listeners[event] = listeners[event]!.filter((l) => l !== callback);
        };
    },

    emit<K extends EventKey>(event: K, payload: EventMap[K]) {
        listeners[event]?.forEach((cb) => {
            (cb as Listener<K>)(payload);
        });
    },
};
