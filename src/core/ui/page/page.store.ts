// src/core/ui/page/page.store.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import type { UIPage } from "./page.types";
import { fetchPages } from "./page.api";

interface PageState {
    pages: Record<string, UIPage>;
    loading: boolean;
    error: string | null;

    loadPages: () => Promise<void>;
    getPage: (key: string) => UIPage | undefined;
    clear: () => void;
}

export const usePageStore = create<PageState>((set, get) => ({
    pages: {},
    loading: false,
    error: null,

    async loadPages() {
        set({ loading: true, error: null });
        try {
            const pages = await fetchPages();
            // console.log("usePageStore|loadPages:", pages);
            const pageMap: Record<string, UIPage> = {};
            pages.forEach((p) => {
                pageMap[p.key] = p;
            });
            set({ pages: pageMap, loading: false });
        } catch (e: any) {
            set({ error: e.message || "Failed to load pages", loading: false });
        }
    },

    getPage(key: string) {
        return get().pages[key];
    },

    clear() {
        set({ pages: {}, loading: false, error: null });
    },
}));
