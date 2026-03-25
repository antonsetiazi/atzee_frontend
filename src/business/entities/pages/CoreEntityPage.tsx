// src/business/entities/CoreEntityPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, Navigate } from "react-router-dom";
import LoadingState from "@/shared/ui/LoadingState";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import PageHeader from "@/core/ui/layout/PageHeader";
import BlockRenderer from "../renderers/BlockRenderer";
import { useEntityData } from "../hooks/useEntityData";
import { useEntityContext } from "../hooks/useEntityContext";
import { useEntitySchema } from "../hooks/useEntitySchema";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();
    const { isMobile } = useBreakpoint();

    const { schema, loading: loadingSchema } = useEntitySchema(entityKey);

    const context = useEntityContext(schema?.accept_context);

    const { data: pageData, loading: loadingData } = useEntityData({
        entityKey,
        schema,
        context,
        id,
    });

    /**
     * =========================================
     * 🔐 GUARD
     * =========================================
     */
    if (!entityKey) {
        return <Navigate to="/dashboard" replace />;
    }

    /**
     * =========================================
     * ⏳ LOADING STATE
     * =========================================
     */
    if (loadingSchema || loadingData) {
        return <LoadingState />;
    }

    /**
     * =========================================
     * 🚀 MAIN RENDER
     * =========================================
     */
    return (
        <>
            {/* 🔥 HEADER */}
            <PageHeader
                title={schema.title}
                description={schema.description}
                isMobile={isMobile}
                // variant={
                //     entityKey === "ustadzku.guest.home" ? "home" : "default"
                // }
                variant="home"
            />

            {/* 🔥 CONTENT WRAPPER (IMPROVED) */}
            <div
                className={`mx-auto w-full ${
                    isMobile ? "px-4 py-4 space-y-3" : "px-6 py-6 space-y-4"
                }`}
            >
                {/* 🔥 BLOCK STACK (CENTRALIZED SPACING) */}
                <div className="w-full space-y-6">
                    {schema.blocks?.map((block: any, idx: number) => (
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
                    ))}
                </div>
            </div>
        </>
    );
}
