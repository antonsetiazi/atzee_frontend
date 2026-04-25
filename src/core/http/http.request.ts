// src/core/http/http.request.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSessionStore } from "@/core/session/session.store";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { TENANT_CODE } from "@/core/tenant/tenant.config";

import { buildUrl, parseResponse } from "./http.utils";
import { AppResponseError, getResponseKind } from "@/core/response";
import {
    getInflightRequest,
    setInflightRequest,
    clearInflightRequest,
} from "./http.cache";

import { refreshTokenApi } from "@/core/auth/auth.api";
import { parseJsonResponse } from "./http.utils";

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

    clearSession();

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

    const method = (rest.method || "GET").toUpperCase();
    const url = buildUrl(input, query);
    const cacheKey = `${method}:${url}`;

    /**
     * ==================================================
     * 🔥 DEDUPE GET REQUEST
     * Jika request sama sedang berjalan → pakai promise lama
     * ==================================================
     */
    if (method === "GET") {
        const existing = getInflightRequest(cacheKey) as Promise<T> | undefined;

        if (existing) {
            return existing;
        }
    }

    const promise = doRequest<T>({
        input,
        url,
        method,
        cacheKey,
        skipAuth,
        timeout,
        rest,
    });

    if (method === "GET") {
        setInflightRequest(cacheKey, promise);
    }

    try {
        return await promise;
    } finally {
        if (method === "GET") {
            clearInflightRequest(cacheKey);
        }
    }
}

async function doRequest<T>(params: {
    input: RequestInfo;
    url: string;
    method: string;
    cacheKey: string;
    skipAuth?: boolean;
    timeout: number;
    rest: RequestInit;
}): Promise<T> {
    const { url, skipAuth, timeout, rest } = params;

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
        const res = await fetch(url, {
            ...rest,
            headers,
            signal: controller.signal,
        });

        clearTimeout(timer);

        /**
         * ==========================================
         * 🔥 HANDLE 401 + REFRESH TOKEN
         * ==========================================
         */
        if (res.status === 401) {
            const { refreshToken, clearSession } = useSessionStore.getState();

            if (!refreshToken) {
                handleUnauthorized();

                throw new AppResponseError({
                    status: 401,
                    message: "Session expired",
                    kind: "auth",
                    code: "UNAUTHORIZED",
                });
            }

            /**
             * Jika sedang refresh token,
             * request lain menunggu
             */
            if (isRefreshing) {
                return new Promise<T>((resolve, reject) => {
                    subscribe(async (newToken: string) => {
                        try {
                            headers.set("Authorization", `Bearer ${newToken}`);

                            const retryRes = await fetch(url, {
                                ...rest,
                                headers,
                                signal: controller.signal,
                            });

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

                const retryRes = await fetch(url, {
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
         * ==========================================
         * ✅ SUCCESS
         * ==========================================
         */
        if (res.ok) {
            if (res.status === 204 || res.status === 205) {
                return undefined as T;
            }

            const raw = await parseJsonResponse(res);

            const method = (rest.method || "GET").toUpperCase();

            const successMethods = ["POST", "PUT", "PATCH", "DELETE"];

            if (successMethods.includes(method) && raw?.message) {
                useFeedbackStore.getState().push({
                    type: "success",
                    title: "Success",
                    message: raw.message,
                });
            }

            if (raw && typeof raw === "object" && "data" in raw) {
                const hasMeta = "meta" in raw;
                const hasMessage = "message" in raw;

                /**
                 * Jika ada meta/message
                 * berarti structured envelope
                 * return full object
                 */
                if (hasMeta || hasMessage) {
                    return raw as T;
                }

                /**
                 * kalau hanya data saja
                 */
                return raw.data as T;
            }

            return raw as T;
        }

        /**
         * ==========================================
         * ❌ ERROR RESPONSE
         * ==========================================
         */
        const payload = await parseResponse<any>(res);

        const backendError = payload?.error;

        const kind = getResponseKind(res.status);

        const message =
            backendError?.message ||
            payload?.detail ||
            `Request failed with status ${res.status}`;

        const error = new AppResponseError({
            status: res.status,
            message,
            kind,
            code: backendError?.code,
            fieldErrors: backendError?.details,
        });

        /**
         * Hanya technical error yang muncul global toast
         */
        if (kind === "network" || kind === "server") {
            useFeedbackStore.getState().push({
                type: "error",
                title: "System Error",
                message,
            });
        }

        throw error;
    } catch (err: any) {
        clearTimeout(timer);

        if (err.name === "AbortError") {
            const error = new AppResponseError({
                status: 0,
                message: "Request timeout, silakan coba lagi",
                kind: "network",
                code: "TIMEOUT",
            });

            useFeedbackStore.getState().push({
                type: "error",
                title: "Timeout",
                message: error.message,
            });

            throw error;
        }

        if (!(err instanceof AppResponseError)) {
            const error = new AppResponseError({
                status: 0,
                message: "Network error, periksa koneksi Anda",
                kind: "network",
                code: "NETWORK_ERROR",
            });

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
