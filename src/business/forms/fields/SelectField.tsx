/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/SelectField.tsx

import type { SelectFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: SelectFieldSchema;
    value?: string | number;
    onChange?: (name: string, value: any) => void;
}

export default function SelectField({ field, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <select
                value={value ?? ""}
                disabled={field.readonly}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={inputBase}
            >
                <option value="">-- Select --</option>

                {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
