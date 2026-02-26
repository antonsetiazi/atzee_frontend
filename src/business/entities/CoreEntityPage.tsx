/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/CoreEntityPage.tsx

import { useEffect, useState, useMemo } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { useUISchemaStore } from "../schema/ui-schema.store";
import LoadingState from "@/shared/ui/LoadingState";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import PageHeader from "@/core/ui/layout/PageHeader";
import { useSessionStore } from "@/core/session/session.store";
import BlockRenderer from "./BlockRenderer";
import { httpGet, httpPost } from "@/core/http/http.client";
import { getCache, setCache } from "./entity.cache";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { isMobile } = useBreakpoint();
    const isHydrated = useSessionStore((s) => s.isHydrated);

    const [schema, setSchema] = useState<any>(null);
    const [loadingSchema, setLoadingSchema] = useState(true);

    const [pageData, setPageData] = useState<any>(null);
    const [loadingData, setLoadingData] = useState(false);

    function buildCacheKey(entityKey: string, url: string, context: any) {
        return `${entityKey}::${url}::${JSON.stringify(context || {})}`;
    }

    /**
     * 🔹 Stable Context (ANTI-INFINITE LOOP)
     */
    const context = useMemo(() => {
        if (!schema?.accept_context) return {};

        const params = new URLSearchParams(location.search);
        const ctx: Record<string, any> = {};

        params.forEach((value, key) => {
            ctx[key] = value;
        });

        if (id) {
            ctx["id"] = id;
        }

        return ctx;
    }, [location.search, schema?.accept_context, id]);

    /**
     * 🔹 Load UI Schema
     */
    useEffect(() => {
        if (!entityKey) return;

        let alive = true;

        async function load(entity: string) {
            // ⛔ JANGAN reset schema → cache-first visual
            setLoadingSchema(true);

            try {
                const uiSchema = await useUISchemaStore
                    .getState()
                    .getSchema(entity);

                if (!alive) return;
                setSchema(uiSchema);
            } finally {
                if (alive) {
                    setLoadingSchema(false);
                }
            }
        }

        load(entityKey);

        return () => {
            alive = false;
        };
    }, [entityKey]);

    /**
     * 🔹 Load Page Data (jika ada data_source di page)
     */
    useEffect(() => {
        if (!schema?.data_source) return;

        let alive = true;

        async function loadData() {
            let url = schema.data_source;

            if (id) {
                url = url.replace("{id}", id);
            }

            if (schema.accept_context && context) {
                Object.keys(context).forEach((key) => {
                    url = url.replace(`{${key}}`, context[key]);
                });
            }

            const cacheKey = buildCacheKey(entityKey, url, context);

            // ✅ 1️⃣ CHECK CACHE FIRST
            const cached = getCache<any>(cacheKey);
            if (cached) {
                setPageData(cached);
                return; // 🚀 STOP HERE
            }

            // ❌ NOT CACHED → FETCH
            setLoadingData(true);

            try {
                let res: any;

                if (schema.method === "GET") {
                    res = await httpGet(url);
                } else {
                    // POST → ambil payload_from_context dari schema
                    let payload = {};

                    if (schema.payload_from_context) {
                        payload = Object.keys(
                            schema.payload_from_context,
                        ).reduce(
                            (acc, key) => {
                                const val = schema.payload_from_context[key];

                                // ganti placeholder {id} atau context lainnya
                                if (typeof val === "string") {
                                    let replaced = val;
                                    Object.keys(context).forEach((cKey) => {
                                        replaced = replaced.replace(
                                            `{${cKey}}`,
                                            context[cKey],
                                        );
                                    });
                                    acc[key] = replaced;
                                } else {
                                    acc[key] = val;
                                }
                                return acc;
                            },
                            {} as Record<string, any>,
                        );
                    }

                    res = await httpPost(url, payload);
                }

                if (!alive) return;

                let normalized: any = null;

                if (Array.isArray(res)) {
                    normalized = res;
                } else if (res && typeof res === "object") {
                    normalized = res;
                }

                // ✅ SAVE TO CACHE
                setCache(cacheKey, normalized);

                setPageData(normalized);
            } catch (err) {
                console.error("Failed to fetch page data:", err);
            } finally {
                if (alive) setLoadingData(false);
            }
        }

        loadData();

        return () => {
            alive = false;
        };
    }, [schema, id, context, entityKey]);

    if (!entityKey) {
        return <Navigate to="/dashboard" replace />;
    }

    // ⛔ Loading hanya jika schema benar-benar belum ada
    if (!schema && loadingSchema) {
        return <LoadingState />;
    }

    if (!isHydrated || loadingData) {
        return <LoadingState />;
    }
    // console.log(schema);
    // console.log(id);
    // console.log(pageData);

    return (
        <div
            className="w-full"
            style={{
                background: "var(--color-background)",
            }}
        >
            <PageHeader
                title={schema.title}
                description={schema.description}
                isMobile={isMobile}
            />

            {/* Page Body */}
            <div
                className={`
                mx-auto
                w-full
                ${isMobile ? "px-4 py-4 space-y-3" : "px-6 py-6 space-y-4"}
            `}
            >
                {schema.blocks?.map((block: any, idx: number) => {
                    return (
                        <div
                            key={idx}
                            className="rounded-xl"
                            style={{
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div className={isMobile ? "p-4" : "p-6"}>
                                <BlockRenderer
                                    block={block}
                                    idx={idx}
                                    entityKey={entityKey}
                                    schema={schema}
                                    pageData={pageData}
                                    context={context}
                                    id={id}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
