/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockTable.tsx

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdaptiveTableRenderer from "../../tables/AdaptiveTableRenderer";
// import EmptyState from "@/shared/ui/EmptyState";
import { usePermissionStore } from "@/core/permissions/permission.store";
import type { TableContext } from "../../tables/table.context";
import { button } from "@/core/ui/ui.class";
import { interpolate } from "@/core/utils/interpolate";

interface Props {
    block: any;
    data: any[]; // 🔥 Pure data from Page
    total?: number; // optional
    entityKey: string;
    id?: string;
}

export default function BlockTable({
    block,
    data = [],
    total,
    entityKey,
    id,
}: Props) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const safeData = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return safeData.slice(start, end);
    }, [safeData, page, pageSize]);

    const tableContext = useMemo<TableContext>(
        () => ({
            navigate: (path: string) => navigate(path),
            refresh: () => {}, // 🔥 no-op (page-level refresh only)
            entityKey,
            parent_id: id,
        }),
        [navigate, entityKey, id],
    );

    return (
        <div
            className="group relative overflow-hidden rounded-2xl transition-all duration-200"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Accent Line (hover effect like ListView) */}
            <div
                className="absolute left-0 top-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: "var(--color-primary)",
                }}
            />

            {/* Header */}
            {(block.title || block.top_actions?.length > 0) && (
                <div
                    className="flex items-start justify-between gap-6 px-6 py-5 border-b"
                    style={{
                        borderColor: "var(--color-border)",
                    }}
                >
                    <div className="space-y-1">
                        {block.title && (
                            <h3
                                className="text-lg font-semibold tracking-tight"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                {block.title}
                            </h3>
                        )}

                        {block.description && (
                            <p
                                className="text-sm"
                                style={{
                                    color: "var(--text-secondary)",
                                }}
                            >
                                {block.description}
                            </p>
                        )}
                    </div>

                    {/* Top Actions */}
                    {block.top_actions?.length > 0 && (
                        <div className="flex gap-2 shrink-0">
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
                                            if (action.type === "navigate") {
                                                navigate(
                                                    interpolate(action.to, {
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
                    )}
                </div>
            )}

            {/* Body */}
            <div className="px-6 py-5">
                {safeData.length > 0 ? (
                    <div className="overflow-hidden rounded-xl">
                        <AdaptiveTableRenderer
                            entity={entityKey}
                            schema={block}
                            data={paginatedData}
                            loading={false}
                            total={total ?? safeData.length}
                            page={page}
                            pageSize={pageSize}
                            context={tableContext}
                            onPageChange={setPage}
                            onPageSizeChange={(size: number) => {
                                setPageSize(size);
                                setPage(1);
                            }}
                            onSortChange={() => {}}
                            onSearch={() => {}}
                        />
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                        <div className="text-base font-semibold text-gray-700">
                            {block.empty_title || "No data available"}
                        </div>

                        {block.empty_description && (
                            <div className="mt-2 text-sm text-gray-500">
                                {block.empty_description}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
