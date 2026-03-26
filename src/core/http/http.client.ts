// src/core/http/http.client.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { request } from "./http.request";

export function httpGet<T = any>(
    url: string,
    options?: {
        skipAuth?: boolean;
        query?: Record<string, any>;
        headers?: HeadersInit;
    },
): Promise<T> {
    return request<T>(url, {
        method: "GET",
        ...options,
    });
}

export function httpPost<T = any>(
    url: string,
    body?: any,
    options?: {
        skipAuth?: boolean;
        headers?: HeadersInit;
    },
): Promise<T> {
    return request<T>(url, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

export function httpPut<T = any>(url: string, body?: any): Promise<T> {
    return request<T>(url, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
    });
}

export function httpPatch<T = any>(url: string, body?: any): Promise<T> {
    return request<T>(url, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
    });
}

export function httpDelete<T = any>(url: string): Promise<T> {
    return request<T>(url, {
        method: "DELETE",
    });
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
