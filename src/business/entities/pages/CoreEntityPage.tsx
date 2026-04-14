// src/business/entities/CoreEntityPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, Navigate } from "react-router-dom";
import LoadingState from "@/shared/ui/LoadingState";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import BlockRenderer from "../renderers/BlockRenderer";
import { useEntityData } from "../hooks/useEntityData";
import { useEntityContext } from "../hooks/useEntityContext";
import { useEntitySchema } from "../hooks/useEntitySchema";
import { HeaderPage } from "@/core/ui/components";
import { usePageStore } from "@/core/ui/page/page.store";
import { useEffect, useState } from "react";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();
    const { isMobile } = useBreakpoint();
    const [isScrolled, setIsScrolled] = useState(false);
    const showHeader = usePageStore((s) => s.showHeader);
    const headerMode = usePageStore((s) => s.headerMode);

    const { schema, loading: loadingSchema } = useEntitySchema(entityKey);

    const context = useEntityContext(schema?.accept_context);

    const { data: pageData, loading: loadingData } = useEntityData({
        entityKey,
        schema,
        context,
        id,
    });

    useEffect(() => {
        const el = document.getElementById("main-scroll");
        if (!el) return;

        const handleScroll = () => {
            setIsScrolled(el.scrollTop > 60);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

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

    // console.log(schema);
    return (
        <>
            {/* DEFAULT HEADER */}
            {showHeader && headerMode === "default" && (
                <HeaderPage title={schema.title} subtitle={schema.subtitle} />
            )}

            {/* OVERLAY HEADER (scroll-based) */}
            {headerMode === "overlay" && isMobile && isScrolled && (
                <div className="sticky top-0 z-50">
                    <HeaderPage
                        title={schema.title}
                        subtitle={schema.description}
                    />
                </div>
            )}

            {/* 🔥 CONTENT WRAPPER (IMPROVED) */}
            <div
                className={`mx-auto w-full ${
                    isMobile ? "space-y-3" : "px-6 py-6 space-y-4"
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
