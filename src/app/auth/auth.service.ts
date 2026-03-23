// src/app/auth/auth.service.ts

import {
    loginApi,
    loginOtpApi,
    requestOtpApi,
    fetchAuthConfig,
} from "@/core/auth/auth.api";
import type { LoginPayload } from "../../core/auth/auth.types";
import { useSessionStore } from "@/core/session/session.store";
import { usePermissionStore } from "@/core/permissions/permission.store";
import { runUserBootstrap } from "@/core/bootstrap/services/user.bootstrap";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    user_id: string;
    username: string;
    role_id?: string;
    active_tenant: string;
}

export function useAuthService() {
    function clearSession() {
        useSessionStore.getState().clearSession();
    }

    function clearPermissions() {
        usePermissionStore.getState().clearPermissions();
    }

    async function getAuthConfig() {
        return fetchAuthConfig();
    }

    async function requestOtp(phone: string) {
        return requestOtpApi({ phone });
    }

    async function loginOtp(phone: string, otp: string, tenant_code: string) {
        const res = await loginOtpApi({
            phone,
            otp,
            tenant_code,
        });

        localStorage.setItem("token", res.tokens.access);

        const jwt = jwtDecode<JwtPayload>(res.tokens.access);
        const userWithRole = {
            ...res.user,
            role_id: jwt.role_id,
        };

        useSessionStore.getState().setSession(res.tokens.access, userWithRole);
    }

    async function loginPassword(payload: LoginPayload) {
        localStorage.removeItem("token");
        const res = await loginApi(payload);

        localStorage.setItem("token", res.tokens.access);

        // 🔥 decode token untuk ambil role_id
        const jwt = jwtDecode<JwtPayload>(res.tokens.access);
        const userWithRole = {
            ...res.user,
            role_id: jwt.role_id,
        };

        useSessionStore.getState().setSession(res.tokens.access, userWithRole);

        // 🔥 reload User state
        await runUserBootstrap();
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
        getAuthConfig,
        loginPassword,
        requestOtp,
        loginOtp,
        logout,
        isAuthenticated,
    };
}
