/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/schema/filter-schema.types.ts

export type FilterOperator =
    | "eq"
    | "neq"
    | "contains"
    | "gt"
    | "lt"
    | "in"
    | "between";

export interface FilterFieldSchema {
    key: string;
    label: string;
    type: "text" | "number" | "select" | "date";
    operators: FilterOperator[];
    options?: { label: string; value: any }[];
}

export interface FilterSchema {
    fields: FilterFieldSchema[];
}
