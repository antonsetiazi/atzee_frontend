/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockTable.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableRenderer from "../../tables/TableRenderer";
import { fetchTableData } from "./../entity.api";
import type { EntityQuery } from "./../entity.query.types";
import EmptyState from "@/shared/ui/EmptyState";
import { usePermissionStore } from "@/core/permissions/permission.store";
import type { TableContext } from "../../tables/table.context";
import { button } from "@/core/ui/ui.class";
import { interpolate } from "@/core/utils/interpolate";

interface Props {
    entityKey: string;
    schema: any;
    block: any;
    searchMode: string;
    id?: string;
}

export default function BlockTable({
    entityKey,
    schema,
    block,
    searchMode,
    id,
}: Props) {
    const navigate = useNavigate();

    // 🔹 LIST PAGE STATE
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const [loadingData, setLoadingData] = useState(true);

    const [query, setQuery] = useState<EntityQuery>({
        page: 1,
        pageSize: 10,
        id: id,
    });

    const isBlockDataSource = block?.data_source;

    const refreshTable = useCallback(async () => {
        const url = interpolate(block.data_source, { id });

        setLoadingData(true);
        try {
            const res = await fetchTableData(schema.entity, url, query);
            // console.log("res: ", res);
            setData(res.items);
            setTotal(res.total);
        } catch (err) {
            console.error("Failed to fetch entity list:", err);
            setData([]);
            setTotal(0);
        } finally {
            setLoadingData(false);
        }
    }, [schema.entity, query, block, id]);

    useEffect(() => {
        if (!entityKey) return;

        async function load() {
            setLoadingData(true);

            if (isBlockDataSource) {
                await refreshTable();
                return;
            }

            // Fallback
            setData([]);
            setTotal(0);
            setLoadingData(false);
        }

        load();
    }, [entityKey, query, schema, isBlockDataSource, refreshTable]);

    const tableContext = useMemo<TableContext>(
        () => ({
            navigate: (path: string) => navigate(path),
            refresh: refreshTable,
            entityKey,
            parent_id: id,
        }),
        [navigate, refreshTable, entityKey, id],
    );

    // console.log(schema);
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        {block.title}
                    </h1>
                    {schema.description && (
                        <p className="text-sm text-gray-500">
                            {block.description}
                        </p>
                    )}
                </div>
                <div>
                    {block.top_actions?.length > 0 && (
                        <div>
                            <div className="flex gap-2">
                                {block.top_actions.map((action: any) => {
                                    const canShow =
                                        !action.permission ||
                                        usePermissionStore
                                            .getState()
                                            .has(action.permission);
                                    if (!canShow) return null;

                                    return (
                                        <button
                                            key={action.label}
                                            className={`${button.base} ${button.primary}`}
                                            onClick={() => {
                                                if (
                                                    action.type === "navigate"
                                                ) {
                                                    navigate(
                                                        interpolate(action.to, {
                                                            ...tableContext,
                                                            id,
                                                        }),
                                                    );
                                                }
                                            }}
                                        >
                                            {action.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="p-4">
                {data?.length > 0 ? (
                    <TableRenderer
                        entity={schema.entity}
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
                        onSearch={(search) => {
                            if (searchMode === "server") {
                                // server-side → tetap trigger backend
                                setQuery((q) => ({
                                    ...q,
                                    search,
                                    page: 1,
                                }));
                            }
                        }}
                    />
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}
