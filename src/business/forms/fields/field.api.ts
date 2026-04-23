// src/business/forms/fields/field.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost, httpGet } from "@/core/http/http.client";
import { getFieldCache, setFieldCache } from "./field.cache";

export interface SelectOption {
    label: string;
    value: string | number;
}

function buildCacheKey(url: string, payload?: Record<string, any>) {
    return `field:${url}:${JSON.stringify(payload ?? {})}`;
}

export async function fetchFieldOptions(
    dataSource: string,
    payload: Record<string, any> = {},
    method: "GET" | "POST" = "POST",
): Promise<SelectOption[]> {
    const cacheKey = buildCacheKey(dataSource, payload);
    const cached = getFieldCache<SelectOption[]>(cacheKey);
    if (cached) return cached;

    let res;

    if (method === "GET") {
        const qs = new URLSearchParams(payload).toString();
        const url = qs ? `${dataSource}?${qs}` : dataSource;
        res = await httpGet<any>(url);
    } else {
        res = await httpPost<{ items: SelectOption[] }>(dataSource, payload);
    }

    // const res = await httpPost<{ items: SelectOption[] }>(dataSource, payload);

    const options = res.items ?? [];

    setFieldCache(cacheKey, options);
    return options;
}
