import { create } from "zustand";
import type { FeedbackMessage } from "./feedback.types";

interface FeedbackState {
    messages: FeedbackMessage[];
    push: (msg: Omit<FeedbackMessage, "id">) => void;
    remove: (id: string) => void;
    clear: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
    messages: [],

    push: (msg) =>
        set((state) => ({
            messages: [...state.messages, { ...msg, id: crypto.randomUUID() }],
        })),

    remove: (id) =>
        set((state) => ({
            messages: state.messages.filter((m) => m.id !== id),
        })),

    clear: () => set({ messages: [] }),
}));
