// src/core/http/http.request.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSessionStore } from "@/core/session/session.store";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { TENANT_CODE } from "@/core/tenant/tenant.config";

import { buildUrl, parseResponse } from "./http.utils";
import { HttpError } from "./http.error";

import { refreshTokenApi } from "@/core/auth/auth.api";

const DEFAULT_TIMEOUT = 30000;

/**
 * Prevent multiple redirects when many requests return 401 at once
 */
let isRedirecting = false;
let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

function subscribe(cb: (token: string) => void) {
    pendingRequests.push(cb);
}

function notify(token: string) {
    pendingRequests.forEach((cb) => cb(token));
    pendingRequests = [];
}

function handleUnauthorized() {
    if (isRedirecting) return;
    isRedirecting = true;

    const { clearSession } = useSessionStore.getState();

    // clear auth state
    clearSession();

    // redirect to session expired page
    window.location.href = "/session-expired";
}

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

    const accessToken = useSessionStore.getState().accessToken;
    const user = useSessionStore.getState().user;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const headers = new Headers(rest.headers || {});

    if (!skipAuth && accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
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

        /**
         * 🔥 GLOBAL AUTH HANDLER
         * Handle expired session / invalid token
         */
        if (res.status === 401) {
            const { refreshToken, clearSession } = useSessionStore.getState();

            if (!refreshToken) {
                handleUnauthorized();
                throw new HttpError(401, "Session expired", "UNAUTHORIZED");
            }

            // =========================
            // 🔥 QUEUE SYSTEM
            // =========================
            if (isRefreshing) {
                return new Promise<T>((resolve, reject) => {
                    subscribe(async (newToken: string) => {
                        try {
                            headers.set("Authorization", `Bearer ${newToken}`);

                            const retryRes = await fetch(
                                buildUrl(input, query),
                                {
                                    ...rest,
                                    headers,
                                    signal: controller.signal,
                                },
                            );

                            const data = await parseResponse<T>(retryRes);
                            resolve(data);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            }

            isRefreshing = true;

            try {
                const tokens = await refreshTokenApi(refreshToken);

                useSessionStore.setState({
                    accessToken: tokens.access,
                    refreshToken: tokens.refresh,
                });

                notify(tokens.access);

                headers.set("Authorization", `Bearer ${tokens.access}`);

                const retryRes = await fetch(buildUrl(input, query), {
                    ...rest,
                    headers,
                    signal: controller.signal,
                });

                return await parseResponse<T>(retryRes);
            } catch (err) {
                pendingRequests = [];
                clearSession();
                handleUnauthorized();
                throw err;
            } finally {
                isRefreshing = false;
            }
        }

        /**
         * ✅ SUCCESS RESPONSE
         */
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
