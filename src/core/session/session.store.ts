// src/core/session/session.store.ts

import { create } from "zustand";
import type { SessionState, SessionUser } from "./session.types";

interface SessionActions {
    setSession: (token: string, user: SessionUser) => void;
    clearSession: () => void;
    hydrate: () => void;
}

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    vertical: null,
    isHydrated: false,

    setSession: (token, user) =>
        set({
            token,
            user,
            isAuthenticated: true,
        }),

    clearSession: () =>
        set({
            token: null,
            user: null,
            isAuthenticated: false,
        }),

    hydrate: () => {
        const token = localStorage.getItem("token");

        if (token) {
            set({
                token,
                user: null,
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
}));
