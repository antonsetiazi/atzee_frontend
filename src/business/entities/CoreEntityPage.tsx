/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/CoreEntityPage.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useUISchemaStore } from "../schema/ui-schema.store";
import FilterRenderer from "../filters/FilterRenderer";
import TableRenderer from "../tables/TableRenderer";
import FormRenderer from "../forms/FormRenderer";
import WorkflowContainer from "../workflows/WorkflowContainer";
import { fetchEntityList, fetchEntityDetail } from "./entity.api";
import type { EntityQuery } from "./entity.query.types";
import LoadingState from "@/shared/ui/LoadingState";
import EmptyState from "@/shared/ui/EmptyState";
import { usePermissionStore } from "@/core/permissions/permission.store";
import type { TableContext } from "../tables/table.context";
import { button } from "@/core/ui/ui.class";

interface Props {
    entityKey: string;
}

export default function CoreEntityPage({ entityKey }: Props) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [schema, setSchema] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [initialValues, setInitialValues] = useState<any>({});

    const [loadingSchema, setLoadingSchema] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const [query, setQuery] = useState<EntityQuery>({
        page: 1,
        pageSize: 10,
    });

    const isListPage = entityKey.endsWith(".list");
    const isEditPage = entityKey.endsWith(".edit");
    const isCreatePage = entityKey.endsWith(".create");

    // -------------------------------
    // refreshTable → untuk delete / action
    // -------------------------------
    const refreshTable = useCallback(async () => {
        if (!isListPage) return;

        setLoadingData(true);
        try {
            const res = await fetchEntityList(entityKey, query);
            setData(res.items);
            setTotal(res.total);
        } catch (err) {
            console.error("Failed to fetch entity list:", err);
            setData([]);
            setTotal(0);
        } finally {
            setLoadingData(false);
        }
    }, [entityKey, query, isListPage]);

    useEffect(() => {
        if (!entityKey) return;

        async function load(entity: string) {
            setLoadingSchema(true);
            setLoadingData(true);

            // Load UI schema
            const uiSchema = await useUISchemaStore
                .getState()
                .getSchema(entity);

            setSchema(uiSchema);
            setLoadingSchema(false);

            if (isListPage) {
                await refreshTable();
                return;
            }

            if (isEditPage && id) {
                try {
                    // Ambil URL dari schema.blocks[form].submit_to
                    const formBlock = schema.blocks.find(
                        (b: any) => b.type === "form",
                    );
                    if (formBlock?.submit_to) {
                        const submitUrl = formBlock.submit_to.replace(
                            "{id}",
                            id.toString(),
                        );
                        const res = await fetchEntityDetail(submitUrl);
                        setInitialValues(res);
                    }
                } catch (err) {
                    console.error("Failed to fetch entity detail:", err);
                } finally {
                    setLoadingData(false);
                }
                return;
            }

            // Create page → kosongin initialValues
            if (isCreatePage) {
                setInitialValues({});
                setLoadingData(false);
                return;
            }

            // Fallback
            setData([]);
            setTotal(0);
            setLoadingData(false);
        }

        load(entityKey);
    }, [
        entityKey,
        query,
        id,
        schema,
        isListPage,
        isEditPage,
        isCreatePage,
        refreshTable,
    ]);

    const tableContext = useMemo<TableContext>(
        () => ({
            navigate: (path: string) => navigate(path),
            refresh: refreshTable,
            entityKey,
        }),
        [navigate, refreshTable, entityKey],
    );

    if (!entityKey) return <Navigate to="/dashboard" replace />;

    if (loadingSchema || loadingData) return <LoadingState />;

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
                    if (block.type === "filter") {
                        return (
                            <div
                                key={idx}
                                className="bg-white border rounded-lg p-4 shadow-sm"
                            >
                                <FilterRenderer
                                    key={idx}
                                    schema={block}
                                    onApply={(filters) =>
                                        setQuery((q) => ({
                                            ...q,
                                            filters,
                                            page: 1,
                                        }))
                                    }
                                />
                            </div>
                        );
                    }

                    if (block.type === "table") {
                        const hasData = data?.length > 0;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-lg shadow-sm"
                            >
                                {block.top_actions?.length > 0 && (
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                        <div className="flex gap-2">
                                            {block.top_actions.map(
                                                (action: any) => {
                                                    const canShow =
                                                        !action.permission ||
                                                        usePermissionStore
                                                            .getState()
                                                            .has(
                                                                action.permission,
                                                            );
                                                    if (!canShow) return null;

                                                    return (
                                                        <button
                                                            key={action.label}
                                                            className={`${button.base} ${button.primary}`}
                                                            onClick={() => {
                                                                if (
                                                                    action.type ===
                                                                    "navigate"
                                                                ) {
                                                                    navigate(
                                                                        action.to,
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            {action.label}
                                                        </button>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Table */}
                                <div className="p-4">
                                    {hasData ? (
                                        <TableRenderer
                                            schema={block}
                                            data={data}
                                            loading={loadingData}
                                            total={total}
                                            page={query.page}
                                            pageSize={query.pageSize}
                                            context={tableContext}
                                            onPageChange={(page) =>
                                                setQuery((q) => ({
                                                    ...q,
                                                    page,
                                                }))
                                            }
                                            onPageSizeChange={(pageSize) =>
                                                setQuery((q) => ({
                                                    ...q,
                                                    pageSize,
                                                    page: 1,
                                                }))
                                            }
                                            onSortChange={(sort) =>
                                                setQuery((q) => ({
                                                    ...q,
                                                    sort,
                                                }))
                                            }
                                            onSearch={(search) =>
                                                setQuery((q) => ({
                                                    ...q,
                                                    search,
                                                    page: 1,
                                                }))
                                            }
                                        />
                                    ) : (
                                        <EmptyState />
                                    )}
                                </div>
                            </div>
                        );
                    }

                    if (block.type === "form") {
                        const submitUrl = block.submit_to?.replace(
                            "{id}",
                            id || "",
                        );
                        return (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                            >
                                <FormRenderer
                                    key={idx}
                                    schema={{ ...block, submit_to: submitUrl }}
                                    initialValues={initialValues}
                                    context={tableContext}
                                />
                            </div>
                        );
                    }

                    if (block.type === "workflow") {
                        return (
                            <div
                                key={idx}
                                className="bg-gray-50 border rounded-lg p-4"
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

                    return null;
                })}
            </div>
        </div>
    );
}
