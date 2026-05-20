// src/core/ui/components/data_table/renderers/DataTableMobile.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DataTableProps } from "../data_table.types";

interface Props<T> extends Pick<
    DataTableProps<T>,
    "columns" | "loading" | "emptyTitle" | "emptyDescription" | "rowKey" | "onRowClick"
> {
    sortedData: T[];
}

export default function DataTableMobile<T>({
    columns,
    sortedData,
    loading = false,
    emptyTitle = "No Data",
    emptyDescription = "There is no available data.",
    rowKey,
    onRowClick,
}: Props<T>) {
    /**
     * =========================================
     * LOADING
     * =========================================
     */
    if (loading) {
        return (
            <div className="space-y-3 p-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                    >
                        <div className="mb-4 h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />

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

    /**
     * =========================================
     * EMPTY
     * =========================================
     */
    if (sortedData.length === 0) {
        return (
            <div className="p-3">
                <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
                    <div className="text-base font-semibold text-[var(--text-primary)]">
                        {emptyTitle}
                    </div>

                    <div className="mt-2 text-sm text-[var(--text-secondary)]">
                        {emptyDescription}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * =========================================
     * CARD LIST
     * =========================================
     */
    return (
        <div className="space-y-3 p-3">
            {sortedData.map((row, index) => (
                <div
                    key={rowKey ? rowKey(row, index) : String(index)}
                    onClick={() => onRowClick?.(row)}
                    className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all ${
                        onRowClick ? "cursor-pointer active:scale-[0.99]" : ""
                    }`}
                >
                    <div className="space-y-3">
                        {columns.map((col) => (
                            <div key={col.key} className="flex items-start justify-between gap-4">
                                {/* LABEL */}
                                <div className="min-w-[100px] text-sm text-[var(--text-secondary)]">
                                    {col.title}
                                </div>

                                {/* VALUE */}
                                <div
                                    className={`flex-1 text-sm text-[var(--text-primary)] ${
                                        col.align === "center" ? "text-center" : ""
                                    } ${col.align === "right" ? "text-right" : "text-left"}`}
                                >
                                    {col.render
                                        ? col.render(row)
                                        : String((row as any)[col.key] ?? "-")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
