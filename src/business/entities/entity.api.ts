/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/entity.api.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type { EntityQuery } from "./entity.query.types";
import { getCache, setCache } from "./entity.cache";

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
 * API PLATFORM — BACKWARD COMPATIBLE
 */
export async function fetchEntityList(
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
        `/entities/${entity}/query/`,
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
