// src/core/bootstrap/services/auth.bootstrap.ts

import { refreshTokenApi } from "@/core/auth/auth.api";
import { isTokenExpired } from "@/core/auth/token.utils";
import { useSessionStore } from "@/core/session/session.store";
import { buildUserFromAccessToken } from "@/core/auth/auth.identity";

export async function AuthBootstrap() {
    const store = useSessionStore.getState();

    // 1. hydrate dulu
    store.hydrate();

    let { accessToken } = useSessionStore.getState();
    const { refreshToken } = useSessionStore.getState();

    // 🔥 STEP 1: cek expiry
    if (accessToken && isTokenExpired(accessToken)) {
        try {
            const res = await refreshTokenApi(refreshToken!);

            // 🔥 update access token baru
            useSessionStore.setState({
                accessToken: res.access,
                refreshToken: res.refresh,
                user: buildUserFromAccessToken(res.access),
                isAuthenticated: true,
            });

            accessToken = res.access;
        } catch {
            // refresh gagal → logout
            store.clearSession();
            useSessionStore.setState({ isBootstrapped: true });
            return;
        }
    }

    if (accessToken) {
        useSessionStore.setState({
            user: buildUserFromAccessToken(accessToken),
            isAuthenticated: true,
        });
    }

    // 🔥 STEP 2: baru fetch user
    if (accessToken) {
        try {
            await store.reloadSession();
        } catch {
            // ignore (sudah aman)
        }
    }

    useSessionStore.setState({ isBootstrapped: true });
}
