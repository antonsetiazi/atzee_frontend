/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/ViewField.tsx

import type { FormFieldSchema } from "./field.types";

interface Props {
    field: FormFieldSchema;
    value?: any;
}

export default function ViewField({ field, value }: Props) {
    return (
        <div className="space-y-1 gap-1.5">
            <label className="block text-sm font-medium text-gray-500">
                {field.label}
            </label>

            <div className="text-gray-800 min-h-6">
                {renderValue(field, value)}
            </div>
        </div>
    );
}

function renderValue(field: FormFieldSchema, value: any) {
    if (value === null || value === undefined || value === "") {
        return <span className="text-gray-400">-</span>;
    }

    switch (field.type) {
        case "boolean":
            return value ? "Yes" : "No";

        case "date":
            return new Date(value).toLocaleDateString();

        case "select":
            // asumsi select entity bisa object / string
            if (typeof value === "object") {
                return value.label ?? value.name ?? JSON.stringify(value);
            }
            return value;

        default:
            return String(value);
    }
}
