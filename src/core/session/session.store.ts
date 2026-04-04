// src/core/session/session.store.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import type { SessionState, SessionTokens, SessionUser } from "./session.types";
import { fetchSession } from "./session.api";

interface SessionActions {
    setSession: (tokens: SessionTokens, user: SessionUser | null) => void;
    clearSession: () => void;
    hydrate: () => void;
    updateUser: (user: Partial<SessionUser>) => void;
    reloadSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
    vertical: null,
    isHydrated: false,
    isBootstrapped: false,

    setSession: (tokens: SessionTokens, user: SessionUser | null) => {
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            user: user,
            isAuthenticated: true,
        });
    },

    clearSession: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
        });
    },

    hydrate: () => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (access && refresh) {
            set({
                accessToken: access,
                refreshToken: refresh,
                isAuthenticated: true,
                isHydrated: true,
            });
        } else {
            set({
                accessToken: null,
                refreshToken: null,
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
        } catch (error: any) {
            console.error("Failed to reload session", error);

            // Jika token invalid → hapus token & reset session
            if (error.status === 401) {
                useSessionStore.getState().clearSession();
            }
        }
    },
}));
