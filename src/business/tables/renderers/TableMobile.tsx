// src/business/tables/renderers/TableMobile.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
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
    onSearch,
    context,
}: Props) {
    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>(
        {},
    );

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    const rows = useMemo(() => data ?? [], [data]);

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-3xl p-4 animate-pulse"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="h-4 w-1/2 rounded mb-4 bg-black/10 dark:bg-white/10" />
                        <div className="space-y-2">
                            <div className="h-3 rounded bg-black/10 dark:bg-white/10" />
                            <div className="h-3 rounded bg-black/10 dark:bg-white/10" />
                            <div className="h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* SEARCH */}
            <div className="relative">
                <input
                    placeholder="Search data..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 pl-11 text-sm outline-none transition-all"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--text-primary)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    }}
                />

                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    🔍
                </div>
            </div>

            {/* EMPTY */}
            {rows.length === 0 && (
                <div
                    className="rounded-xl p-4 text-center"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <div className="text-3xl mb-2">📭</div>
                    <div
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                    >
                        No data found
                    </div>
                    <div
                        className="text-xs mt-1"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Try another keyword or refresh data.
                    </div>
                </div>
            )}

            {/* CARDS */}
            {rows.map((row, idx) => {
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
                        className="rounded-xl p-4 transition-all duration-200 active:scale-[0.99]"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
                        }}
                    >
                        {/* HEADER */}
                        <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0 flex-1">
                                {primary.map((col) => (
                                    <div
                                        key={col.key}
                                        className="truncate text-[15px] font-semibold"
                                        style={{
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {String(row[col.key] ?? "—")}
                                    </div>
                                ))}
                            </div>

                            <div
                                className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
                                style={{
                                    background:
                                        "color-mix(in srgb, var(--color-primary) 14%, transparent)",
                                    color: "var(--color-primary)",
                                }}
                            >
                                #{from + idx}
                            </div>
                        </div>

                        {/* IMPORTANT */}
                        <div className="mt-4 space-y-1">
                            {important.map((col) => (
                                <div
                                    key={col.key}
                                    className="flex items-start justify-between gap-3 text-sm"
                                >
                                    <span
                                        style={{
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {col.label}
                                    </span>

                                    <span
                                        className="text-right font-medium"
                                        style={{
                                            color: "var(--text-primary)",
                                        }}
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
                                        className="mt-4 space-y-2 pt-4"
                                        style={{
                                            borderTop:
                                                "1px dashed var(--color-border)",
                                        }}
                                    >
                                        {secondary.map((col) => (
                                            <div
                                                key={col.key}
                                                className="flex items-start justify-between gap-3 text-sm"
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
                                    type="button"
                                    onClick={() =>
                                        setExpandedRows((prev) => ({
                                            ...prev,
                                            [idx]: !prev[idx],
                                        }))
                                    }
                                    className="mt-4 text-xs font-semibold transition-opacity hover:opacity-80"
                                    style={{
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    {isExpanded
                                        ? "▲ Show less"
                                        : "▼ Show details"}
                                </button>
                            </>
                        )}

                        {/* ACTIONS */}
                        {schema.actions && (
                            <div
                                className="mt-2 pt-2"
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
            {total > 0 && (
                <div
                    className="rounded-2xl p-3"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <div className="flex items-center justify-between gap-3">
                        <button
                            disabled={page <= 1}
                            onClick={() => onPageChange(page - 1)}
                            className="rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-40"
                            style={{
                                background: "var(--color-surface-alt)",
                                color: "var(--text-primary)",
                            }}
                        >
                            ← Prev
                        </button>

                        <div className="text-center">
                            <div
                                className="text-sm font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                Page {page} / {totalPages}
                            </div>

                            <div
                                className="text-xs"
                                style={{
                                    color: "var(--text-secondary)",
                                }}
                            >
                                {from}-{to} of {total}
                            </div>
                        </div>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => onPageChange(page + 1)}
                            className="rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-40"
                            style={{
                                background: "var(--color-primary)",
                                color: "#fff",
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
