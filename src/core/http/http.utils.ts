// src/core/http/http.utils.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function buildUrl(
    input: RequestInfo,
    query?: Record<string, any>,
): string {
    let url = "";

    if (typeof input !== "string") {
        url = String(input);
    } else if (input.startsWith("http")) {
        url = input;
    } else {
        url = `${API_BASE_URL}${input}`;
    }

    if (query) {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, String(v)));
            } else {
                params.append(key, String(value));
            }
        });

        const qs = params.toString();
        if (qs) url += `?${qs}`;
    }

    return url;
}

export async function parseResponse<T>(res: Response): Promise<T> {
    const text = await res.text();

    if (!text) return undefined as T;

    try {
        return JSON.parse(text);
    } catch {
        return text as unknown as T;
    }
}
