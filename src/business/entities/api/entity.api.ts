// src/business/entities/entity.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";
import type { EntityQuery } from "../types/entity.query.types";
import { getCache, setCache } from "../cache/entity.cache";

export interface EntityListResponse<T = any> {
    items: T[];
    total: number;
}

/**
 * Fingerprint query untuk cache key
 * PLATFORM-LEVEL — tidak tahu bisnis
 */
function buildCacheKey(entity: string, query: EntityQuery) {
    return `${entity}:${JSON.stringify(query)}`;
}

/**
 * Cache key untuk table block
 * dataSource + query = unik
 */
function buildTableCacheKey(entity: string, query: EntityQuery) {
    return `table:${entity}:${JSON.stringify(query)}`;
}

/**
 * API PLATFORM — BACKWARD COMPATIBLE
 */
export async function fetchEntityList(
    domain: string,
    entity: string,
    query: EntityQuery,
): Promise<EntityListResponse> {
    const cacheKey = buildCacheKey(entity, query);

    // ✅ CACHE HIT
    const cached = getCache<EntityListResponse>(cacheKey);
    if (cached) {
        return cached;
    }

    // 🔁 FETCH BACKEND
    const result = await httpPost<EntityListResponse>(
        `/entities/${domain}/${entity}/query/`,
        query,
    );

    // 💾 CACHE RESULT
    setCache(cacheKey, result);

    return result;
}

/**
 * Fetch detail entity by id (untuk edit page)
 */
export async function fetchEntityDetail(submitUrl: string) {
    return httpGet(submitUrl);
}

export async function fetchTableData(
    entity: string,
    dataSource: string,
    query: EntityQuery,
): Promise<EntityListResponse> {
    const cacheKey = buildTableCacheKey(entity, query);

    // ✅ CACHE HIT
    const cached = getCache<EntityListResponse>(cacheKey);
    if (cached) {
        return cached;
    }

    // 🔁 FETCH BACKEND
    const result = await httpPost<EntityListResponse>(dataSource, query);

    // 💾 CACHE RESULT
    setCache(cacheKey, result);

    return result;
}
