// src/engine/ui/table/schema/table.schema.ts

import type { EntityAction } from "@/core/schema/action.schema";

export type TableColumnType = "text" | "number" | "date" | "badge";

export type ColumnPriority = 1 | 2 | 3;

export interface TableColumnSchema {
    key: string; // field dari backend
    label: string; // header

    type?: TableColumnType;
    sortable?: boolean;
    width?: number | string;

    priority?: ColumnPriority;
}

export interface EntityTableSchema {
    title?: string;
    description?: string;
    columns: TableColumnSchema[];
    actions?: EntityAction[];
    detail_as_state: boolean;
}
