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
        return (
            <div
                className="py-6 text-center text-sm"
                style={{ color: "var(--text-secondary)" }}
            >
                Loading data...
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* SEARCH */}
            <input
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm transition-all"
                style={{
                    background: "var(--color-surface-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--text-primary)",
                }}
            />

            {/* CARDS */}
            {data.map((row, idx) => {
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

                    if (index === 0) return { ...col, _priority: 1 };
                    if (index === 1) return { ...col, _priority: 2 };

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
                        className="rounded-2xl p-4 transition-all"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        {/* PRIMARY */}
                        {primary.map((col) => (
                            <div
                                key={col.key}
                                className="text-base font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {String(row[col.key] ?? "—")}
                            </div>
                        ))}

                        {/* IMPORTANT */}
                        <div className="mt-3 space-y-1.5">
                            {important.map((col) => (
                                <div
                                    key={col.key}
                                    className="flex justify-between text-sm"
                                >
                                    <span
                                        style={{
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {col.label}
                                    </span>
                                    <span
                                        className="font-medium text-right"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {String(row[col.key] ?? "—")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* SECONDARY */}
                        {secondary.length > 0 && (
                            <>
                                {isExpanded && (
                                    <div
                                        className="mt-3 space-y-1.5 pt-3"
                                        style={{
                                            borderTop:
                                                "1px solid var(--color-border)",
                                        }}
                                    >
                                        {secondary.map((col) => (
                                            <div
                                                key={col.key}
                                                className="flex justify-between text-sm"
                                            >
                                                <span
                                                    style={{
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {col.label}
                                                </span>
                                                <span
                                                    className="text-right"
                                                    style={{
                                                        color: "var(--text-primary)",
                                                    }}
                                                >
                                                    {String(
                                                        row[col.key] ?? "—",
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    className="mt-3 text-xs font-medium transition-colors"
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
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
                            <div
                                className="mt-4 pt-3 flex justify-end"
                                style={{
                                    borderTop: "1px solid var(--color-border)",
                                }}
                            >
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

            {/* PAGINATION */}
            <div
                className="flex items-center justify-between text-sm pt-2"
                style={{ color: "var(--text-secondary)" }}
            >
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="transition-opacity disabled:opacity-40"
                >
                    Prev
                </button>

                <span>
                    Page{" "}
                    <span
                        style={{
                            color: "var(--text-primary)",
                            fontWeight: 500,
                        }}
                    >
                        {page}
                    </span>
                </span>

                <button
                    disabled={page * pageSize >= total}
                    onClick={() => onPageChange(page + 1)}
                    className="transition-opacity disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
