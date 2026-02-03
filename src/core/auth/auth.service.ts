// src/core/auth/auth.service.ts

import { loginApi } from "./auth.api";
import type { LoginPayload } from "./auth.types";
import { useSessionStore } from "@/core/session/session.store";
import { usePermissionStore } from "@/core/permissions/permission.store";

export function useAuthService() {
    const setSession = useSessionStore((s) => s.setSession);
    const clearSession = useSessionStore((s) => s.clearSession);
    // const setPermissions = usePermissionStore((s) => s.setPermissions);
    const clearPermissions = usePermissionStore((s) => s.clearPermissions);

    async function login(payload: LoginPayload) {
        localStorage.removeItem("token");
        const res = await loginApi(payload);

        // set session
        setSession(res.tokens.access, res.user);
        localStorage.setItem("token", res.tokens.access);
    }

    function logout() {
        clearSession();
        clearPermissions();

        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    function isAuthenticated(): boolean {
        return !!useSessionStore.getState().token;
    }

    return {
        login,
        logout,
        isAuthenticated,
    };
}
