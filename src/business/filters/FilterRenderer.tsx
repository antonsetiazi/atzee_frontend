/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/filters/FilterRenderer.tsx

import type {
    FilterSchema,
    FilterFieldSchema,
} from "../schema/filter-schema.types";
import { useState } from "react";
import FilterField from "./FilterField";

interface Props {
    schema: FilterSchema;
    onApply: (filters: any[]) => void;
}

export default function FilterRenderer({ schema, onApply }: Props) {
    const [filters, setFilters] = useState<any[]>([]);

    function updateFilter(
        field: FilterFieldSchema,
        operator: string,
        value: any,
    ) {
        setFilters((prev) => {
            const rest = prev.filter((f) => f.field !== field.key);
            return [...rest, { field: field.key, operator, value }];
        });
    }

    return (
        <div className="space-y-3 p-4 border rounded bg-gray-50">
            {schema.fields.map((field) => (
                <FilterField
                    key={field.key}
                    field={field}
                    onChange={(op, val) => updateFilter(field, op, val)}
                />
            ))}

            <div className="flex justify-end">
                <button
                    onClick={() => onApply(filters)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}
