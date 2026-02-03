/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/field.api.ts

import { httpGet } from "@/core/http/http.client";
import { fetchEntityList } from "@/business/entities/entity.api";
import type { FieldDataSource } from "./field.types";
import { getFieldCache, setFieldCache } from "./field.cache";

export interface SelectOption {
    label: string;
    value: string | number;
}

function compileLabel(template: string, data: any) {
    return template.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? "");
}

function buildCacheKey(ds: FieldDataSource) {
    return `field:${JSON.stringify(ds)}`;
}

export async function fetchFieldOptions(
    dataSource: FieldDataSource,
): Promise<SelectOption[]> {
    const cacheKey = buildCacheKey(dataSource);
    const cached = getFieldCache<SelectOption[]>(cacheKey);
    if (cached) return cached;

    let options: SelectOption[] = [];

    // 🔹 LOOKUP
    if (dataSource.type === "lookup") {
        const result = await httpGet<
            SelectOption[] | { options: SelectOption[] }
        >(dataSource.endpoint);
        options = Array.isArray(result) ? result : (result.options ?? []);
    }

    // 🔹 ENTITY
    if (dataSource.type === "entity") {
        const res = await fetchEntityList(
            dataSource.domain,
            dataSource.entity,
            dataSource.query ?? {},
        );

        options = res.items.map((item: any) => ({
            value: item[dataSource.map.value],
            label: compileLabel(dataSource.map.label, item),
        }));
    }

    setFieldCache(cacheKey, options);
    return options;
}
