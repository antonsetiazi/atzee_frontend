// src/core/ui/navigation/navigation.store.ts
import { create } from "zustand";

interface NavigationItem {
    label: string;
    icon: string;
    action_type: string;
    target: string;
    route: string | null;
    is_primary: boolean;
    badge: number | null;
}

interface NavigationState {
    bottom: NavigationItem[];
    topbar: NavigationItem[];
    setBottom: (items: NavigationItem[]) => void;
    setTopbar: (items: NavigationItem[]) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    bottom: [],
    topbar: [],
    setBottom: (items) => set({ bottom: items }),
    setTopbar: (items) => set({ topbar: items }),
}));
