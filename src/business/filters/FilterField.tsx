/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
    FilterFieldSchema,
    FilterOperator,
} from "../schema/filter-schema.types";
import { useState } from "react";

interface Props {
    field: FilterFieldSchema;
    onChange: (operator: FilterOperator, value: any) => void;
}

export default function FilterField({ field, onChange }: Props) {
    const [operator, setOperator] = useState<FilterOperator>(
        field.operators[0]
    );
    const [value, setValue] = useState<any>("");

    function handleOperatorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const op = e.target.value as FilterOperator;
        setOperator(op);
        onChange(op, value);
    }

    function handleValueChange(val: any) {
        setValue(val);
        onChange(operator, val);
    }

    return (
        <div className="grid grid-cols-3 gap-2 items-center">
            <label className="text-sm">{field.label}</label>

            {/* OPERATOR */}
            <select
                value={operator}
                onChange={handleOperatorChange}
                className="border px-2 py-1 text-sm"
            >
                {field.operators.map((op) => (
                    <option key={op} value={op}>
                        {op}
                    </option>
                ))}
            </select>

            {/* VALUE */}
            {field.type === "select" ? (
                <select
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="border px-2 py-1 text-sm"
                >
                    <option value="">--</option>
                    {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={field.type === "number" ? "number" : "text"}
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="border px-2 py-1 text-sm"
                />
            )}
        </div>
    );
}
