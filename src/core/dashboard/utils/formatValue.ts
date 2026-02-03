/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/dashboard/utils/formatValue.ts

import type { WidgetMeta } from "../dashboard.types";

export function formatValue(value: any, meta?: WidgetMeta): string {
    if (value === null || value === undefined) {
        return meta?.emptyLabel ?? "—";
    }

    if (!meta?.format) {
        return String(value);
    }

    switch (meta.format) {
        case "number":
            return new Intl.NumberFormat().format(Number(value));

        case "currency":
            return new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: meta.currency ?? "USD",
            }).format(Number(value));

        case "percent":
            return `${Number(value) * 100}%`;

        case "date":
            return new Intl.DateTimeFormat().format(new Date(value));

        default:
            return String(value);
    }
}
