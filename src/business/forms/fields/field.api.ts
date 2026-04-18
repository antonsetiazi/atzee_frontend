// src/business/forms/fields/field.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "@/core/http/http.client";
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
): Promise<SelectOption[]> {
    const cacheKey = buildCacheKey(dataSource, payload);
    const cached = getFieldCache<SelectOption[]>(cacheKey);
    if (cached) return cached;

    const res = await httpPost<{ items: SelectOption[] }>(dataSource, payload);

    const options = res.items ?? [];

    setFieldCache(cacheKey, options);
    return options;
}
