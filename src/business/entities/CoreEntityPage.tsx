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

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const { id } = useParams<{ id: string }>();

    const [schema, setSchema] = useState<any>(null);
    const [loadingSchema, setLoadingSchema] = useState(true);

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        {schema.title || "Entity"}
                    </h1>
                    {schema.description && (
                        <p className="text-sm text-gray-500">
                            {schema.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Page Content */}
            <div className="space-y-6">
                {schema.blocks?.map((block: any, idx: number) => {
                    if (block.type === "table") {
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-lg shadow-sm"
                            >
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
                                <BlockFiles
                                    block={block}
                                    entityKey={entityKey}
                                    id={id}
                                />
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}
