/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/EmailFields.tsx

import type { EmailFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: EmailFieldSchema;
    value?: string;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function EmailField({ field, value, error, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <input
                type="email"
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
