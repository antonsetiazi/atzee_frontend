// src/core/ui/page/page.store.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import type { UIPage } from "./page.types";
import { fetchPages } from "./page.api";

/**
 * 🔥 Page Meta (UI Control Layer)
 */
export interface PageMeta {
    showBottomNav?: boolean;
    showHeader?: boolean;
    fullscreen?: boolean;
    headerMode?: "default" | "overlay" | "hidden";
}
interface PageState {
    pages: Record<string, UIPage>;
    loading: boolean;
    error: string | null;

    loadPages: () => Promise<void>;
    getPage: (key: string) => UIPage | undefined;
    clear: () => void;

    // 🔥 UI META STATE (GLOBAL CONTROL)
    showBottomNav: boolean;
    showHeader: boolean;
    fullscreen: boolean;
    headerMode: "default" | "overlay" | "hidden";

    setMeta: (meta?: PageMeta) => void;
}

/**
 * 🔥 Default Meta (IMPORTANT)
 */
const DEFAULT_META: Required<PageMeta> = {
    showBottomNav: false,
    showHeader: true,
    fullscreen: false,
    headerMode: "default",
};

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

    // ========================
    // UI META CONTROL
    // ========================
    showBottomNav: DEFAULT_META.showBottomNav,
    showHeader: DEFAULT_META.showHeader,
    fullscreen: DEFAULT_META.fullscreen,
    headerMode: DEFAULT_META.headerMode,

    setMeta(meta) {
        set({
            showBottomNav: meta?.showBottomNav ?? DEFAULT_META.showBottomNav,
            showHeader: meta?.showHeader ?? DEFAULT_META.showHeader,
            fullscreen: meta?.fullscreen ?? DEFAULT_META.fullscreen,
            headerMode: meta?.headerMode ?? DEFAULT_META.headerMode,
        });
    },
}));
