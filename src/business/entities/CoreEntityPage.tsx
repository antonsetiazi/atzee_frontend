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

        return ctx;
    }, [location.search, schema?.accept_context]);

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
            setLoadingData(true);

            try {
                let url = schema.data_source;

                // 🔹 Replace dynamic {id}
                if (id) {
                    url = url.replace("{id}", id);
                }

                // 🔹 Replace context {param}
                if (schema.accept_context && context) {
                    Object.keys(context).forEach((key) => {
                        url = url.replace(`{${key}}`, context[key]);
                    });
                }

                let res: any;

                if (schema.method === "GET") {
                    res = await httpGet(url);
                } else {
                    // POST / PATCH / etc
                    res = await httpPost(url, context);
                }

                if (!alive) return;

                // 🔥 SAFE NORMALIZATION
                let normalized: any = null;

                // Jika response array → berarti list endpoint
                if (Array.isArray(res)) {
                    normalized = res;
                }
                // Jika response object → biarkan utuh (aggregate / detail)
                else if (res && typeof res === "object") {
                    normalized = res;
                }
                // fallback
                else {
                    normalized = null;
                }

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
    }, [schema, id, context]);

    if (!entityKey) {
        return <Navigate to="/dashboard" replace />;
    }

    // ⛔ Loading hanya jika schema benar-benar belum ada
    if (!schema && loadingSchema) {
        return <LoadingState />;
    }

    if (!isHydrated) return <LoadingState />;
    if (loadingData) return <LoadingState />;
    if (!isHydrated) return <LoadingState />;
    // console.log(schema);
    // console.log(id);
    // console.log(pageData);

    return (
        <div className="mx-auto w-full">
            <PageHeader
                title={schema.title}
                description={schema.description}
                isMobile={isMobile}
            />

            {/* Page Content */}
            <div className="space-y-1">
                {schema.blocks?.map((block: any, idx: number) => {
                    return (
                        <div key={idx} className="bg-white p-4">
                            <BlockRenderer
                                key={idx}
                                block={block}
                                idx={idx}
                                entityKey={entityKey}
                                schema={schema}
                                pageData={pageData}
                                context={context}
                                id={id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
