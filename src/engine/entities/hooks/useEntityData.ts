// src/engine/entities/hooks/useEntityData.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { httpGet, httpPost } from "@/core/http/http.client";
import { getCache, setCache } from "@/engine/entities/cache/entity.cache";

/**
 * 🔹 Build cache key
 */
function buildCacheKey(entityKey: string, url: string, context: any) {
    return `${entityKey}::${url}::${JSON.stringify(context || {})}`;
}

/**
 * 🔹 Replace placeholder {key} with context value
 */
function replacePlaceholders(value: any, context: Record<string, any>) {
    if (typeof value !== "string") return value;

    let result = value;

    Object.keys(context).forEach((key) => {
        const val = context[key];

        // ❗ SKIP kalau kosong
        if (val === undefined || val === null || val === "") return;

        result = result.replace(`{${key}}`, val);
    });

    return result;
}
/**
 * 🔹 Build POST payload from schema
 */
function buildPayload(schema: any, context: Record<string, any>) {
    if (!schema.payload_from_context) return context || {};

    return Object.keys(schema.payload_from_context).reduce(
        (acc, key) => {
            const val = schema.payload_from_context[key];
            acc[key] = replacePlaceholders(val, context);
            return acc;
        },
        {} as Record<string, any>,
    );
}

export function useEntityData({
    entityKey,
    schema,
    context,
    id,
}: {
    entityKey: string;
    schema: any;
    context: any;
    id?: string;
}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        const handler = (e: any) => {
            // optional: filter entity
            if (!e.detail?.entity || e.detail.entity === entityKey) {
                // console.log("🔄 Refresh entity:", entityKey);
                setRefreshIndex((i) => i + 1);
            }
        };

        window.addEventListener("entity:refresh", handler);

        return () => {
            window.removeEventListener("entity:refresh", handler);
        };
    }, [entityKey]);

    useEffect(() => {
        if (!schema?.data_source) return;

        let alive = true;

        async function load() {
            let url = schema.data_source;

            // 🔹 Replace {id}
            if (id) {
                url = url.replace("{id}", id);
            }

            // 🔹 Replace context placeholders in URL
            if (schema.accept_context && context) {
                Object.keys(context).forEach((key) => {
                    const val = context[key];

                    if (val === undefined || val === null || val === "") return;

                    url = url.replace(`{${key}}`, val);
                });
            }

            const cacheKey = buildCacheKey(entityKey, url, context);

            // ✅ CACHE FIRST
            const cached = getCache<any>(cacheKey);
            if (cached) {
                setData(cached);
                return;
            }

            setLoading(true);

            // console.log("CTX:", context);
            // console.log("FINAL URL:", url);

            try {
                let res: any;

                if (schema.method === "GET") {
                    res = await httpGet(url);
                } else {
                    const payload = buildPayload(schema, context);
                    res = await httpPost(url, payload);
                }

                if (!alive) return;

                // 🔹 Normalize response
                let normalized: any = null;

                if (Array.isArray(res)) {
                    normalized = res;
                } else if (res && typeof res === "object") {
                    normalized = res;
                } else {
                    normalized = null;
                }

                // 💾 Cache result
                setCache(cacheKey, normalized);

                setData(normalized);
            } catch (err) {
                console.error("Failed to fetch entity data:", err);
            } finally {
                if (alive) setLoading(false);
            }
        }

        load();

        return () => {
            alive = false;
        };
    }, [schema, context, id, entityKey, refreshIndex]);

    return { data, loading };
}
