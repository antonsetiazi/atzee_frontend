/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/tables/renderers/TableMobile.tsx

import { useState } from "react";
import type { EntityTableSchema, TableColumnSchema } from "../table.types";
import type { TableContext } from "../table.context";
import { ActionRenderer } from "@/business/actions/ActionRenderer";

interface Props {
    entity: string;
    schema: EntityTableSchema;
    data: any[];
    loading?: boolean;

    total: number;
    page: number;
    pageSize: number;

    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onSortChange: (
        sort: { field: string; direction: "asc" | "desc" }[],
    ) => void;
    onSearch: (value: string) => void;

    context: TableContext;
}

export default function TableMobile({
    entity,
    schema,
    data,
    loading,
    total,
    page,
    pageSize,
    onPageChange,
    // onPageSizeChange,
    onSearch,
    context,
}: Props) {
    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>(
        {},
    );

    if (loading) {
        return <div className="p-4 text-sm text-gray-500">Loading...</div>;
    }

    return (
        <div className="space-y-4">
            {/* Search */}
            <input
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                onChange={(e) => onSearch(e.target.value)}
            />

            {/* Cards */}
            {data.map((row, idx) => {
                /**
                 * SMART PRIORITY ENGINE
                 * ----------------------
                 * If priority:
                 *  - 1 → Primary
                 *  - 2 → Important
                 *  - 3 → Secondary
                 *
                 * If null/undefined:
                 *  - First column → Primary
                 *  - Second column → Important
                 *  - Others → Secondary
                 */

                const columnsWithPriority: (TableColumnSchema & {
                    _priority: 1 | 2 | 3;
                })[] = schema.columns.map((col, index) => {
                    if (
                        col.priority === 1 ||
                        col.priority === 2 ||
                        col.priority === 3
                    ) {
                        return { ...col, _priority: col.priority };
                    }

                    // Smart fallback
                    if (index === 0) {
                        return { ...col, _priority: 1 };
                    }

                    if (index === 1) {
                        return { ...col, _priority: 2 };
                    }

                    return { ...col, _priority: 3 };
                });

                const primary = columnsWithPriority.filter(
                    (c) => c._priority === 1,
                );

                const important = columnsWithPriority.filter(
                    (c) => c._priority === 2,
                );

                const secondary = columnsWithPriority.filter(
                    (c) => c._priority === 3,
                );

                const isExpanded = expandedRows[idx];

                return (
                    <div
                        key={idx}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                        {/* PRIMARY */}
                        {primary.map((col) => (
                            <div
                                key={col.key}
                                className="text-base font-semibold text-gray-900"
                            >
                                {String(row[col.key] ?? "-")}
                            </div>
                        ))}

                        {/* IMPORTANT */}
                        <div className="mt-2 space-y-1">
                            {important.map((col) => (
                                <div
                                    key={col.key}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="text-gray-500">
                                        {col.label}
                                    </span>
                                    <span className="font-medium text-gray-800 text-right">
                                        {String(row[col.key] ?? "-")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* SECONDARY (Expandable) */}
                        {secondary.length > 0 && (
                            <>
                                {isExpanded && (
                                    <div className="mt-2 space-y-1 border-t pt-2">
                                        {secondary.map((col) => (
                                            <div
                                                key={col.key}
                                                className="flex justify-between text-sm"
                                            >
                                                <span className="text-gray-500">
                                                    {col.label}
                                                </span>
                                                <span className="text-gray-700 text-right">
                                                    {String(
                                                        row[col.key] ?? "-",
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    className="mt-2 text-xs text-blue-600"
                                    onClick={() =>
                                        setExpandedRows((prev) => ({
                                            ...prev,
                                            [idx]: !prev[idx],
                                        }))
                                    }
                                >
                                    {isExpanded ? "Show less" : "Show more"}
                                </button>
                            </>
                        )}

                        {/* ACTIONS */}
                        {schema.actions && (
                            <div className="mt-3 flex justify-end gap-2 border-t pt-3">
                                <ActionRenderer
                                    entity={entity}
                                    actions={schema.actions}
                                    row={row}
                                    context={context}
                                    detail_as_state={schema.detail_as_state}
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Simple Pagination */}
            <div className="flex justify-between text-sm text-gray-600">
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    Prev
                </button>
                <span>Page {page}</span>
                <button
                    disabled={page * pageSize >= total}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
