// src/core/confirm/confirm.store.ts

import { create } from "zustand";

export type ConfirmLevel = "info" | "warning" | "danger";

interface ConfirmPayload {
    title?: string;
    message: string;
    level?: ConfirmLevel;
    resolve: (value: boolean) => void;
}

interface ConfirmState {
    current?: ConfirmPayload;
    confirm: (data: Omit<ConfirmPayload, "resolve">) => Promise<boolean>;
    close: (result: boolean) => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
    current: undefined,

    confirm: (data) => {
        return new Promise<boolean>((resolve) => {
            set({
                current: {
                    ...data,
                    resolve,
                },
            });
        });
    },

    close: (result) => {
        const current = get().current;
        if (current) {
            current.resolve(result);
        }
        set({ current: undefined });
    },
}));
