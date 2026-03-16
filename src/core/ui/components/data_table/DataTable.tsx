// src/core/ui/components/data_table/DataTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { DataTableProps } from "./data_table.types";

export default function DataTable<T>({
    columns,
    data,
    rowKey,
    className = "",
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    function handleSort(key: string) {
        if (sortKey === key) {
            setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);

            setSortDir("asc");
        }
    }

    const sortedData = [...data].sort((a: any, b: any) => {
        if (!sortKey) return 0;

        const av = a[sortKey];
        const bv = b[sortKey];

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;

        return 0;
    });

    return (
        <div
            className={`
                overflow-x-auto
                border
                border-[var(--color-border)]
                rounded-[var(--radius)]
                bg-[var(--color-surface)]
                ${className}
            `}
        >
            <table className="w-full text-sm">
                {/* Header */}

                <thead
                    className="
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-secondary)]
                    "
                >
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={{ width: col.width }}
                                onClick={() =>
                                    col.sortable && handleSort(col.key)
                                }
                                className={`
                                    text-left
                                    px-4
                                    py-3
                                    font-medium
                                    border-b
                                    border-[var(--color-border)]
                                    ${
                                        col.sortable
                                            ? "cursor-pointer select-none"
                                            : ""
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2">
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

                {/* Body */}

                <tbody>
                    {sortedData.map((row, i) => (
                        <tr
                            key={rowKey ? rowKey(row, i) : String(i)}
                            className="
                                border-b
                                border-[var(--color-border)]
                                hover:bg-[var(--color-surface-alt)]
                                transition
                            "
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="
                                        px-4
                                        py-3
                                        text-[var(--text-primary)]
                                    "
                                >
                                    {col.render
                                        ? col.render(row)
                                        : (row as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
