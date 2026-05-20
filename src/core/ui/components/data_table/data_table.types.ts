// src/core/ui/components/data_table/data_table.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from "react";

export type DataTableMobileVariant = "table" | "card";

export interface DataTableColumn<T = any> {
    key: string;
    title: ReactNode;
    render?: (row: T) => ReactNode;
    sortable?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    className?: string;
    headerClassName?: string;
}

export interface DataTableProps<T = any> {
    title?: string;
    subtitle?: string;
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    onRowClick?: (row: T) => void;
    rowKey?: (row: T, index: number) => string;
    className?: string;
    stickyHeader?: boolean;
    mobileVariant?: DataTableMobileVariant;

    /* =========================
     * SEARCH
     * ========================= */
    searchable?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;

    /* =========================
     * ACTIONS
     * ========================= */
    actions?: DataTableAction[];

    /* =========================
     * PAGINATION
     * ========================= */
    pagination?: DataTablePagination;
}

export interface DataTableAction {
    label: string;
    icon?: React.ElementType;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "ghost";
}

export interface DataTablePagination {
    page: number;
    totalPages: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
}
