// src/core/ui/components/data_table/DataTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import type { DataTableProps } from "./data_table.types";
import Button from "@/core/ui/components/button/Button";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";
import DataTableToolbar from "./DataTableToolbar";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import DataTableDesktop from "./renderers/DataTableDesktop";
import { useBreakpoint } from "../../layout/hooks/useBreakpoint";
import DataTableMobile from "./renderers/DataTableMobile";

export default function DataTable<T>({
    title,
    subtitle,
    columns,
    data,
    loading = false,
    emptyTitle = "No Data",
    emptyDescription = "There is no available data.",
    rowKey,
    onRowClick,
    stickyHeader = false,
    className = "",
    searchable = false,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    actions = [],
    pagination,
    mobileVariant = "table",
}: DataTableProps<T>) {
    const { isMobile } = useBreakpoint();

    /**
     * =========================================
     * SORT STATE
     * =========================================
     */
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    /**
     * =========================================
     * SORT HANDLER
     * =========================================
     */
    function handleSort(key: string) {
        if (sortKey === key) {
            setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    }

    /**
     * =========================================
     * SORTED DATA
     * =========================================
     */
    const sortedData = useMemo(() => {
        return [...data].sort((a: any, b: any) => {
            if (!sortKey) return 0;

            const av = a[sortKey];
            const bv = b[sortKey];

            if (av < bv) return sortDir === "asc" ? -1 : 1;
            if (av > bv) return sortDir === "asc" ? 1 : -1;

            return 0;
        });
    }, [data, sortDir, sortKey]);

    return (
        <div
            className={`overflow-x-auto rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow)] ${className} `}
        >
            {/* =========================================
             * HEADER
             * ========================================= */}
            {(title || subtitle) && (
                <div className="border-b border-[var(--color-border)] px-3 py-3">
                    {title && <h2 className="font-semibold text-[var(--text-primary)]">{title}</h2>}

                    {subtitle && (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
                    )}
                </div>
            )}

            {/* =========================================
             * TOOLBAR
             * ========================================= */}
            {(searchable || actions.length > 0) && (
                <DataTableToolbar
                    left={
                        searchable ? (
                            <DataTableSearch
                                value={searchValue}
                                onChange={(value) => onSearchChange?.(value)}
                                placeholder={searchPlaceholder}
                            />
                        ) : undefined
                    }
                    right={
                        actions.length > 0 ? (
                            <>
                                {actions.map((action, index) => {
                                    const Icon = action.icon;

                                    return (
                                        <Button
                                            key={index}
                                            variant={action.variant}
                                            disabled={action.disabled}
                                            onClick={() => {
                                                if (action.href) {
                                                    SmartNavigate.go(action.href);

                                                    return;
                                                }

                                                action.onClick?.();
                                            }}
                                        >
                                            {Icon && <Icon className="h-4 w-4" />}

                                            {action.label}
                                        </Button>
                                    );
                                })}
                            </>
                        ) : undefined
                    }
                />
            )}

            {/* =========================================
             * TABLE RENDERER
             * ========================================= */}
            {isMobile && mobileVariant === "card" ? (
                <DataTableMobile
                    columns={columns}
                    sortedData={sortedData}
                    loading={loading}
                    emptyTitle={emptyTitle}
                    emptyDescription={emptyDescription}
                    rowKey={rowKey}
                    onRowClick={onRowClick}
                />
            ) : (
                <DataTableDesktop
                    columns={columns}
                    sortedData={sortedData}
                    loading={loading}
                    emptyTitle={emptyTitle}
                    emptyDescription={emptyDescription}
                    rowKey={rowKey}
                    onRowClick={onRowClick}
                    stickyHeader={stickyHeader}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                />
            )}

            {/* PAGINATION */}
            {pagination && (
                <DataTablePagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    onPageChange={pagination.onPageChange}
                />
            )}
        </div>
    );
}
