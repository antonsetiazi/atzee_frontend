// src/core/feedback/feedback.store.ts

import { create } from "zustand";
import type { FeedbackMessage } from "./feedback.types";
import { generateId } from "../identity/id.generator";

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
            messages: [...state.messages, { ...msg, id: generateId() }],
        })),

    remove: (id) =>
        set((state) => ({
            messages: state.messages.filter((m) => m.id !== id),
        })),

    clear: () => set({ messages: [] }),
}));
