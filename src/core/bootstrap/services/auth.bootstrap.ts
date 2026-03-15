// src/core/bootstrap/services/auth.bootstrap.ts

import { useSessionStore } from "@/core/session/session.store";

export async function AuthBootstrap() {
    const { hydrate, reloadSession } = useSessionStore.getState();

    // 1. Pastikan session di-hydrate dulu
    hydrate(); // ambil token dari localStorage

    const hydratedToken = useSessionStore.getState().token;

    if (!hydratedToken) {
        // user guest, tidak perlu login
        return;
    }

    // 2. Token ada → fetch user dari backend
    await reloadSession();
}
