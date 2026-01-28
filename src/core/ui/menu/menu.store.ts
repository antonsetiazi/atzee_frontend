// src/core/ui/menu/menu.store.ts

import { create } from "zustand";
import type { MenuItem } from "./menu.types";
import { usePermissionStore } from "@/core/permissions/permission.store";

interface MenuState {
    items: MenuItem[];
    visibleItems: MenuItem[];
    setMenu: (items: MenuItem[]) => void;
    reset: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
    items: [],
    visibleItems: [],

    setMenu: (items) => {
        const { has } = usePermissionStore.getState();

        const filter = (items: MenuItem[]): MenuItem[] =>
            items
                .filter((item) => !item.permission || has(item.permission))
                .map((item) => ({
                    ...item,
                    children: item.children ? filter(item.children) : undefined,
                }));

        set({
            items,
            visibleItems: filter(items),
        });
    },

    reset: () => set({ items: [], visibleItems: [] }),
}));
