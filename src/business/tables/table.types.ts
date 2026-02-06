// src/business/tables/table.types.ts

import type { EntityAction } from "@/business/actions/action.types";

export type TableColumnType = "text" | "number" | "date" | "badge";

export interface TableColumnSchema {
    key: string; // field dari backend
    label: string; // header

    type?: TableColumnType;
    sortable?: boolean;
    width?: number | string;
}

export interface EntityTableSchema {
    title?: string;
    description?: string;
    columns: TableColumnSchema[];
    actions?: EntityAction[];
    detail_as_state: boolean;
}
