// src/core/auth/services/auth.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    loginApi,
    loginOtpApi,
    requestOtpApi,
    fetchAuthConfig,
} from "@/core/auth/api/auth.api";
import type { LoginPayload, LoginResponse } from "@/core/auth/types/auth.types";
import { useSessionStore } from "@/core/session/session.store";
import { usePermissionStore } from "@/core/permissions/store/permission.store";
import { runUserBootstrap } from "@/core/bootstrap/services/user.bootstrap";
import { buildUserFromAccessToken } from "@/core/auth/identity/auth.identity";

/* ==================================================
   NORMALIZER
================================================== */
function normalizeAuthResponse(res: any): LoginResponse {
    const body = res?.data ?? res;

    if (!body?.user || !body?.tokens) {
        throw new Error("Invalid auth response");
    }

    return body;
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
        const raw = await loginOtpApi({
            phone,
            otp,
            tenant_code,
        });

        const res = normalizeAuthResponse(raw);

        const userWithRole = {
            ...res.user,
            ...buildUserFromAccessToken(res.tokens.access),
        };

        useSessionStore.getState().setSession(res.tokens, userWithRole);
    }

    async function loginPassword(payload: LoginPayload) {
        const raw = await loginApi(payload);

        const res = normalizeAuthResponse(raw);

        const userWithRole = {
            ...res.user,
            ...buildUserFromAccessToken(res.tokens.access),
        };

        useSessionStore.getState().setSession(res.tokens, userWithRole);

        // 🔥 reload User state
        await runUserBootstrap();
    }

    function logout() {
        clearSession();
        clearPermissions();

        window.location.href = "/";
    }

    function isAuthenticated(): boolean {
        return !!useSessionStore.getState().accessToken;
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
