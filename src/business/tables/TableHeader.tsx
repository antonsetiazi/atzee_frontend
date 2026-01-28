// src/business/tables/TableHeader.tsx

import type { TableColumnSchema } from "./table.types";

interface SortState {
    field: string;
    direction: "asc" | "desc";
}

interface Props {
    columns: TableColumnSchema[];
    sortState: SortState[];
    onSort: (field: string) => void;
}

export default function TableHeader({ columns, sortState, onSort }: Props) {
    function getSortIndicator(field: string) {
        const current = sortState.find((s) => s.field === field);
        if (!current) return "⇅";
        return current.direction === "asc" ? "↑" : "↓";
    }

    return (
        <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
                {columns.map((col) => (
                    <th
                        key={col.key}
                        style={{ width: col.width }}
                        onClick={() => col.sortable && onSort(col.key)}
                        className={`
                            px-4 py-3 text-left text-xs font-semibold
                            uppercase tracking-wide text-gray-600
                            ${col.sortable ? "cursor-pointer hover:text-gray-900" : ""}
                        `}
                    >
                        <span className="inline-flex items-center gap-1">
                            {col.label}
                            {col.sortable && (
                                <span className="text-[10px] opacity-70">
                                    {getSortIndicator(col.key)}
                                </span>
                            )}
                        </span>
                    </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">
                    Action
                </th>
            </tr>
        </thead>
    );
}
