// src/core/session/session.store.ts

import { create } from "zustand";
import type { SessionState, SessionUser } from "./session.types";
import { fetchSession } from "./session.api";

interface SessionActions {
    setSession: (token: string, user: SessionUser | null) => void;
    clearSession: () => void;
    hydrate: () => void;
    updateUser: (user: Partial<SessionUser>) => void;
    reloadSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    vertical: null,
    isHydrated: false,

    setSession: (token, user) => {
        localStorage.setItem("token", token);
        set({
            token,
            user,
            isAuthenticated: true,
        });
    },

    clearSession: () => {
        localStorage.removeItem("token");
        set({
            token: null,
            user: null,
            isAuthenticated: false,
        });
    },

    hydrate: () => {
        const token = localStorage.getItem("token");
        if (token) {
            set({
                token,
                isAuthenticated: true,
                isHydrated: true,
            });
        } else {
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isHydrated: true,
            });
        }
    },

    updateUser: (userData) => {
        set((state) => ({
            user: state.user ? { ...state.user, ...userData } : state.user,
        }));
    },

    reloadSession: async () => {
        try {
            const user = await fetchSession();
            set({
                user,
                isAuthenticated: true,
            });
        } catch (error) {
            console.error("Failed to reload session", error);
        }
    },
}));
