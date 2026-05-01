// src/engine/entities/entity.query.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type SortDirection = "asc" | "desc";

export interface EntitySort {
    field: string;
    direction: SortDirection;
}

export interface EntityFilter {
    field: string;
    operator: "eq" | "neq" | "contains" | "gt" | "lt" | "in";
    value: any;
}

export interface EntityQuery {
    page: number;
    pageSize: number;
    sort?: EntitySort[];
    filters?: EntityFilter[];
    search?: string;
    id?: string;
}
