// src/business/tables/types.ts

export type TableColumn = {
    key: string;
    label: string;
    sortable?: boolean;
    type?: "text" | "number" | "date" | "badge";
};

export type RowAction = {
    key: string;
    label: string;
    permission: string;
    confirm?: boolean;
    variant?: "primary" | "secondary" | "danger";
};

export type BulkAction = {
    key: string;
    label: string;
    permission: string;
    confirm?: boolean;
};

export type EntityTableSchema = {
    entity: string;
    columns: TableColumn[];
    rowActions?: RowAction[];
    bulkActions?: BulkAction[];
};
