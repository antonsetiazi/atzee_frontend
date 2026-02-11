/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/http/http.client.ts

import { useSessionStore } from "@/core/session/session.store";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { useTenantStore } from "../tenant/tenant.store";

/* ===========================
   CONFIG
   =========================== */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface InternalRequestInit extends RequestInit {
    skipAuth?: boolean;
}

/* ===========================
   TYPES
   =========================== */

export interface HttpErrorPayload {
    error?: {
        code?: string;
        message?: string;
        details?: Record<string, string[]>;
    };
}

/* ===========================
   INTERNAL REQUEST
   =========================== */
function buildUrl(input: RequestInfo): string {
    if (typeof input !== "string") {
        return String(input);
    }

    // sudah absolute → biarkan
    if (input.startsWith("http")) {
        return input;
    }

    // gabungkan dengan base URL
    return `${API_BASE_URL}${input}`;
}

async function request<T>(
    input: RequestInfo,
    init: InternalRequestInit = {},
): Promise<T> {
    const tenant = useTenantStore.getState().activeTenant;
    const token = useSessionStore.getState().token;

    const headers = new Headers(init.headers);

    // 🔐 AUTH HEADER (OPTIONAL)
    if (!init.skipAuth && token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    // 🏢 TENANT HEADER (OPTIONAL, tapi login biasanya belum perlu)
    if (!init.skipAuth && tenant) {
        headers.set("X-Tenant-ID", tenant.id);
    }

    // console.log("http request | tenant:", tenant);
    // Jangan set Content-Type kalau body adalah FormData
    if (!(init.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }
    // headers.set("Content-Type", "application/json");
    // console.log({
    //     url: buildUrl(input),
    //     method: init.method,
    //     headers: Array.from(headers.entries()), // array dari key-value
    //     body: init.body,
    // });
    const res = await fetch(buildUrl(input), {
        ...init,
        headers,
    });

    /* ===========================
       SUCCESS PATH
       =========================== */

    // ✅ SUCCESS
    if (res.ok) {
        // ✅ 204 / 205 → no content
        if (res.status === 204 || res.status === 205) {
            return undefined as T;
        }

        // ✅ response tanpa body (aman)
        const contentLength = res.headers.get("content-length");
        if (contentLength === "0") {
            return undefined as T;
        }

        // ✅ default: parse json
        return (await res.json()) as T;
    }

    // ❌ ERROR PATH
    let errorPayload: HttpErrorPayload = {};

    try {
        errorPayload = await res.json();
    } catch {
        // backend tidak kirim json
    }

    const backendError = errorPayload.error;

    const message =
        backendError?.message || `Request failed with status ${res.status}`;

    // 🔥 PUSH KE GLOBAL FEEDBACK
    useFeedbackStore.getState().push({
        type: "error",
        title: backendError?.code || "Request Error",
        message,
    });

    // ❗ THROW ERROR TERSTRUKTUR
    throw {
        status: res.status,
        code: backendError?.code,
        message,
        fieldErrors: backendError?.details || {},
    };
}

/* ===========================
   PUBLIC HTTP API
   =========================== */

export function httpGet<T = any>(url: string): Promise<T> {
    return request<T>(url, { method: "GET" });
}

export function httpPost<T = any>(
    url: string,
    body?: any,
    options?: { skipAuth?: boolean },
): Promise<T> {
    return request<T>(url, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
        skipAuth: options?.skipAuth,
    });
}

export function httpPatch<T = any>(url: string, body?: any): Promise<T> {
    return request<T>(url, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
    });
}

export function httpPut<T = any>(url: string, body?: any): Promise<T> {
    return request<T>(url, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
    });
}

export function httpDelete<T = any>(url: string): Promise<T> {
    return request<T>(url, { method: "DELETE" });
}

export function httpPostForm<T = any>(
    url: string,
    formData: FormData,
): Promise<T> {
    return request<T>(url, {
        method: "POST",
        body: formData,
    });
}
