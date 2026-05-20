// src/core/ui/components/data_table/renderers/DataTableDesktop.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DataTableProps } from "../data_table.types";
import LoadingState from "../../loading_state/LoadingState";
import EmptyState from "../../empty_state/EmptyState";

interface Props<T> extends Pick<
    DataTableProps<T>,
    | "columns"
    | "loading"
    | "emptyTitle"
    | "emptyDescription"
    | "rowKey"
    | "onRowClick"
    | "stickyHeader"
    | "className"
> {
    sortedData: T[];
    sortKey: string | null;
    sortDir: "asc" | "desc";
    onSort: (key: string) => void;
}

export default function DataTableDesktop<T>({
    columns,
    loading = false,
    emptyTitle = "No Data",
    emptyDescription = "There is no available data.",
    rowKey,
    onRowClick,
    stickyHeader = false,
    className = "",
    onSort,
    sortKey,
    sortDir,
    sortedData,
}: Props<T>) {
    return (
        <div className={`overflow-x-auto ${className} `}>
            <table className="w-full text-sm">
                {/* HEADER */}
                <thead
                    className={`bg-[var(--color-surface-alt)] text-[var(--text-secondary)] ${stickyHeader ? "sticky top-0 z-10" : ""} `}
                >
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={{
                                    width: col.width,
                                    color: "var(--text-muted)",
                                }}
                                onClick={() => col.sortable && onSort(col.key)}
                                className={`border-b border-[var(--color-border)] px-4 py-3 text-left font-medium ${
                                    col.align === "center" ? "text-center" : ""
                                } ${col.align === "right" ? "text-right" : ""} ${
                                    col.sortable ? "cursor-pointer select-none" : ""
                                } ${col.headerClassName || ""} `}
                            >
                                <div
                                    className={`flex items-center gap-2 ${
                                        col.align === "center" ? "justify-center" : ""
                                    } ${col.align === "right" ? "justify-end" : ""} `}
                                >
                                    {col.title}

                                    {sortKey === col.key && (
                                        <span className="text-xs">
                                            {sortDir === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {/* LOADING */}
                    {loading && (
                        <tr>
                            <td colSpan={columns.length} className="p-8">
                                <LoadingState />
                            </td>
                        </tr>
                    )}

                    {/* EMPTY */}
                    {!loading && sortedData.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="p-8">
                                <EmptyState title={emptyTitle} description={emptyDescription} />
                            </td>
                        </tr>
                    )}

                    {/* ROWS */}
                    {!loading &&
                        sortedData.map((row, i) => (
                            <tr
                                key={rowKey ? rowKey(row, i) : String(i)}
                                onClick={() => onRowClick?.(row)}
                                className={`border-b border-[var(--color-border)] transition-colors ${
                                    onRowClick
                                        ? "cursor-pointer hover:bg-[var(--color-surface-alt)]"
                                        : ""
                                } `}
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-4 py-3 text-[var(--text-primary)] ${
                                            col.align === "center" ? "text-center" : ""
                                        } ${
                                            col.align === "right" ? "text-right" : ""
                                        } ${col.className || ""} `}
                                    >
                                        {col.render ? col.render(row) : (row as any)[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
