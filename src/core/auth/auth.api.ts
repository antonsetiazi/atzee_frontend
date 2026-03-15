// src/core/auth/auth.api.ts

import type {
    AuthConfig,
    RequestOtpPayload,
    VerifyOtpPayload,
    LoginPayload,
    LoginResponse,
} from "./auth.types";
import { httpPost, httpGet } from "@/core/http/http.client";

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
    return httpPost<LoginResponse>("/auth/login/", payload, { skipAuth: true });
}

export async function fetchPermissions(): Promise<string[]> {
    return httpGet<string[]>("/auth/permissions/");
}

export async function fetchAuthConfig(): Promise<AuthConfig> {
    return httpGet<AuthConfig>("/auth/config/", { skipAuth: true });
}

export async function requestOtpApi(payload: RequestOtpPayload) {
    return httpPost("/auth/request-otp/", payload, { skipAuth: true });
}

export async function loginOtpApi(
    payload: VerifyOtpPayload,
): Promise<LoginResponse> {
    return httpPost<LoginResponse>("/auth/verify-otp/", payload, {
        skipAuth: true,
    });
}
