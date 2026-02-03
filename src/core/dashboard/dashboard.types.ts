/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/dashboard/dashboard.types.ts

export type WidgetType = "stat" | "table" | "chart" | "text";
export type WidgetSize = "sm" | "md" | "lg";

export interface DashboardWidgetSchema {
    key: string;
    type: WidgetType;
    title: string;
    size: WidgetSize;
    value: any;
    meta?: WidgetMeta;
}

export interface DashboardResponse {
    context: string;
    widgets: DashboardWidgetSchema[];
}

export interface ChartDataset {
    label: string;
    data: number[];
}

export interface ChartValue {
    labels: string[];
    datasets: ChartDataset[];
}

export interface TableColumn {
    key: string;
    label: string;
}

export interface TableValue {
    columns: TableColumn[];
    rows: Record<string, any>[];
}

export interface WidgetMeta {
    format?: "number" | "currency" | "percent" | "date";
    currency?: string;
    suffix?: string;
    emptyLabel?: string;
}
