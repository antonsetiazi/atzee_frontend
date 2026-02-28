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
    function getSortState(field: string) {
        return sortState.find((s) => s.field === field);
    }

    return (
        <thead
            style={{
                background: "var(--color-surface-alt)",
                borderBottom: "1px solid var(--color-border)",
            }}
            className="sticky top-0 z-10"
        >
            <tr>
                {columns.map((col) => {
                    const currentSort = getSortState(col.key);

                    return (
                        <th
                            key={col.key}
                            style={{ width: col.width }}
                            onClick={() => col.sortable && onSort(col.key)}
                            className={`
                                px-4 py-3 text-left text-xs font-medium
                                transition-all duration-150
                                ${col.sortable ? "cursor-pointer" : ""}
                            `}
                        >
                            <div
                                className="inline-flex items-center gap-2"
                                style={{
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span
                                    className={`
                                        transition-colors duration-150
                                        ${
                                            col.sortable
                                                ? "group-hover:text-[var(--text-primary)]"
                                                : ""
                                        }
                                    `}
                                >
                                    {col.label}
                                </span>

                                {col.sortable && (
                                    <span
                                        className="text-[10px] transition-all duration-200"
                                        style={{
                                            color: currentSort
                                                ? "var(--text-primary)"
                                                : "var(--text-secondary)",
                                            opacity: currentSort ? 1 : 0.4,
                                        }}
                                    >
                                        {currentSort
                                            ? currentSort.direction === "asc"
                                                ? "▲"
                                                : "▼"
                                            : "▲"}
                                    </span>
                                )}
                            </div>
                        </th>
                    );
                })}

                {/* Action column spacer */}
                <th
                    className="px-4 py-3 text-xs"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                />
            </tr>
        </thead>
    );
}
