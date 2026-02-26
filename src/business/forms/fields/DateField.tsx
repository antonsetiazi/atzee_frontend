/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/DateField.tsx

import type { FormFieldSchema } from "./field.types";
import { inputBase, inputError } from "./field.ui";

interface Props {
    field: FormFieldSchema;
    value?: any;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function DateField({ field, value, error, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">{field.label}</label>

            <input
                type="date"
                value={value || ""}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                disabled={field.readonly}
                required={field.required}
                className={`${inputBase} ${error ? inputError : ""}`}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
