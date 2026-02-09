/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/TextFields.tsx

import type { TextFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: TextFieldSchema;
    value?: string;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function TextField({ field, value, error, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <input
                type="text"
                name={field.key}
                value={value ?? ""}
                disabled={field.readonly}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={inputBase}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
