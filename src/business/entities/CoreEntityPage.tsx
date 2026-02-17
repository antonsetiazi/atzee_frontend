/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/CoreEntityPage.tsx

import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useUISchemaStore } from "../schema/ui-schema.store";
import WorkflowContainer from "../workflows/WorkflowContainer";
import LoadingState from "@/shared/ui/LoadingState";
import BlockForm from "./blocks/BlockForm";
import BlockTable from "./blocks/BlockTable";
import BlockFiles from "./blocks/BlockFiles";
import BlockTags from "./blocks/BlockTags";
import BlockText from "./blocks/BlockText";
import BlockChart from "./blocks/BlockChart";
import BlockStat from "./blocks/BlockStat";
import BlockShortcut from "./blocks/BlockShortcut";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import BlockBanner from "./blocks/BlockBanner";
import BlockMap from "./blocks/BlockMap";
import PageHeader from "@/core/ui/layout/PageHeader";
import { useSessionStore } from "@/core/session/session.store";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();
    const { isMobile } = useBreakpoint();
    const [schema, setSchema] = useState<any>(null);
    const [loadingSchema, setLoadingSchema] = useState(true);
    const isHydrated = useSessionStore((s) => s.isHydrated);

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

    if (!entityKey) {
        return <Navigate to="/dashboard" replace />;
    }

    // ⛔ Loading hanya jika schema benar-benar belum ada
    if (!schema && loadingSchema) {
        return <LoadingState />;
    }

    function renderBlock(block: any, idx: number): React.ReactNode {
        // 🔥 CONTAINER BLOCK
        if (block.type === "container") {
            return (
                <div
                    key={idx}
                    className="grid w-full"
                    style={{
                        gridTemplateColumns: block.columns
                            ? `repeat(${block.columns}, 1fr)`
                            : "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: block.gap ?? 16,
                    }}
                >
                    {block.blocks?.map((child: any, i: number) =>
                        renderBlock(child, i),
                    )}
                </div>
            );
        }

        if (block.type === "shortcut") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                >
                    <BlockShortcut block={block} />
                </div>
            );
        }

        if (block.type === "table") {
            return (
                <div key={idx} className="bg-white rounded-lg shadow-sm">
                    <BlockTable
                        entityKey={entityKey}
                        schema={schema}
                        block={block}
                        id={id}
                        searchMode={block.search_mode ?? "client"}
                    />
                </div>
            );
        }
        if (block.type === "form") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                >
                    <BlockForm
                        entityKey={entityKey}
                        schema={schema}
                        block={block}
                        id={id}
                        idx={idx}
                    />
                </div>
            );
        }

        if (block.type === "workflow") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                >
                    <WorkflowContainer
                        key={idx}
                        workflow={block}
                        onAction={(action) =>
                            console.log("Workflow action:", action)
                        }
                    />
                </div>
            );
        }

        // 🔥 FILE BLOCK
        if (block.type === "files") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                >
                    <BlockFiles block={block} entityKey={entityKey} id={id} />
                </div>
            );
        }

        // 🔥 TAG BLOCK
        if (block.type === "tags") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                >
                    <BlockTags block={block} entityKey={entityKey} id={id} />
                </div>
            );
        }

        if (block.type === "stat") {
            return (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow-sm p-6 w-full"
                >
                    <BlockStat block={block} />
                </div>
            );
        }

        if (block.type === "chart") {
            return (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow-sm p-6 w-full"
                >
                    <BlockChart block={block} />
                </div>
            );
        }

        if (block.type === "text") {
            return (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow-sm p-6 max-w-3xl"
                >
                    <BlockText block={block} />
                </div>
            );
        }

        if (block.type === "banner") {
            return (
                <div key={idx} className="bg-white rounded shadow-sm w-full">
                    <BlockBanner block={block} schema={schema} />
                </div>
            );
        }

        if (block.type === "map") {
            return (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                >
                    <BlockMap block={block} entityKey={entityKey} id={id} />
                </div>
            );
        }

        return null;
    }

    if (!isHydrated) return <LoadingState />;
    // console.log(schema);
    return (
        <div className="max-w-7xl mx-auto">
            <PageHeader
                title={schema.title}
                description={schema.description}
                isMobile={isMobile}
            />

            {/* Page Content */}
            <div className="space-y-2 px-2 py-2">
                {schema.blocks?.map((block: any, idx: number) => {
                    return renderBlock(block, idx);
                })}
            </div>
        </div>
    );
}
