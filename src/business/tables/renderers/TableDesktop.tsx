/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/tables/renderers/TableDesktop.tsx

import type { EntityTableSchema } from "./../table.types";
import TableHeader from "./../TableHeader";
import TablePagination from "./../TablePagination";
import TableRow from "./../TableRow";
import { useMemo, useState } from "react";
import type { TableContext } from "./../table.context";

interface Props {
    entity: string;
    schema: EntityTableSchema;
    data: any[];
    loading?: boolean;

    // server-side control
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

export default function TableDesktop({
    entity,
    schema,
    data,
    loading,
    total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSearch,
    context,
}: Props) {
    // const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [sortState, setSortState] = useState<
        { field: string; direction: "asc" | "desc" }[]
    >([]);

    function handleSort(field: string) {
        let next: typeof sortState;

        const current = sortState.find((s) => s.field === field);

        if (!current) {
            next = [{ field, direction: "asc" }];
        } else if (current.direction === "asc") {
            next = [{ field, direction: "desc" }];
        } else {
            next = [];
        }

        setSortState(next);
        onSortChange(next);
    }

    // 🔥 Filter data berdasarkan search input
    const filteredData = useMemo(() => {
        if (!searchValue) return data;

        return data.filter((row) =>
            schema.columns.some((col) => {
                const value = row[col.key];
                return value
                    ? String(value)
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : false;
            }),
        );
    }, [searchValue, data, schema.columns]);

    if (loading) {
        return <div className="p-6 text-sm text-gray-500">Loading...</div>;
    }
    // console.log(schema);
    // console.log(filteredData);
    return (
        <div className="w-full">
            {/* 🔎 Search */}
            <div
                className="pb-4"
                style={{ borderBottom: "1px solid var(--color-border)" }}
            >
                <input
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        onSearch(e.target.value);
                    }}
                    placeholder="Search data..."
                    className="
                        w-full rounded-xl
                        px-4 py-2.5 text-sm
                        transition-all duration-200
                    "
                    style={{
                        background: "var(--color-surface-alt)",
                        border: "1px solid var(--color-border)",
                        color: "var(--text-primary)",
                        outline: "none",
                    }}
                />
            </div>

            {/* Table */}
            {!filteredData.length ? (
                <div className="py-12 text-center">
                    <div
                        className="text-base font-medium"
                        style={{ color: "var(--text-primary)" }}
                    >
                        No data available
                    </div>
                    <div
                        className="mt-2 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Try adjusting your search or filters.
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <TableHeader
                            columns={schema.columns}
                            sortState={sortState}
                            onSort={handleSort}
                        />
                        <tbody>
                            {filteredData.map((row, idx) => (
                                <TableRow
                                    entity={entity}
                                    key={idx}
                                    row={row}
                                    schema={schema}
                                    context={context}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div
                className="pt-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
            >
                <TablePagination
                    total={total}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                />
            </div>
        </div>
    );
}
