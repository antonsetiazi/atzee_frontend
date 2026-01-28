// src/core/auth/auth.api.ts

import type { LoginPayload, LoginResponse } from "./auth.types";
import { httpPost, httpGet } from "@/core/http/http.client";

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
    return httpPost<LoginResponse>("/auth/login/", payload, { skipAuth: true });
}

export async function fetchPermissions(): Promise<string[]> {
    return httpGet<string[]>("/auth/permissions/");
}
