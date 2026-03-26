// src/core/http/http.request.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSessionStore } from "@/core/session/session.store";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { TENANT_CODE } from "@/core/tenant/tenant.config";

import { buildUrl, parseResponse } from "./http.utils";
import { HttpError } from "./http.error";

const DEFAULT_TIMEOUT = 30000;

interface InternalRequestInit extends RequestInit {
    skipAuth?: boolean;
    query?: Record<string, any>;
    timeout?: number;
}

export async function request<T>(
    input: RequestInfo,
    init: InternalRequestInit = {},
): Promise<T> {
    const { skipAuth, query, timeout = DEFAULT_TIMEOUT, ...rest } = init;

    const token = useSessionStore.getState().token;
    const user = useSessionStore.getState().user;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const headers = new Headers(rest.headers || {});

    if (!skipAuth && token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    if (TENANT_CODE) {
        headers.set("X-Tenant-Code", TENANT_CODE);
    }

    if (!skipAuth && user?.role_id) {
        headers.set("X-Role-Id", user.role_id);
    }

    if (!(rest.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    try {
        const res = await fetch(buildUrl(input, query), {
            ...rest,
            headers,
            signal: controller.signal,
        });

        clearTimeout(timer);

        if (res.ok) {
            if (res.status === 204 || res.status === 205) {
                return undefined as T;
            }

            return await parseResponse<T>(res);
        }

        const payload = await parseResponse<any>(res);
        const backendError = payload?.error;

        const message =
            backendError?.message || `Request failed with status ${res.status}`;

        const error = new HttpError(
            res.status,
            message,
            backendError?.code,
            backendError?.details,
        );

        useFeedbackStore.getState().push({
            type: "error",
            title: error.code || "Request Error",
            message: error.message,
        });

        throw error;
    } catch (err: any) {
        clearTimeout(timer);

        if (err.name === "AbortError") {
            const error = new HttpError(
                0,
                "Request timeout, silakan coba lagi",
                "TIMEOUT",
            );

            useFeedbackStore.getState().push({
                type: "error",
                title: "Timeout",
                message: error.message,
            });

            throw error;
        }

        if (!(err instanceof HttpError)) {
            const error = new HttpError(
                0,
                "Network error, periksa koneksi Anda",
                "NETWORK_ERROR",
            );

            useFeedbackStore.getState().push({
                type: "error",
                title: "Network Error",
                message: error.message,
            });

            throw error;
        }

        throw err;
    }
}
