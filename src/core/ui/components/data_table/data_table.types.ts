// src/core/ui/components/data_table/data_table.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from "react";

export interface DataTableColumn<T = any> {
    key: string;
    title: ReactNode;
    render?: (row: T) => ReactNode;
    sortable?: boolean;
    width?: string;
}

export interface DataTableProps<T = any> {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey?: (row: T, index: number) => string;
    className?: string;
}
