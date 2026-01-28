/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/TextareaFields.tsx

import type { TextareaFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: TextareaFieldSchema;
    value?: string;
    onChange?: (name: string, value: any) => void;
}

export default function TextareaField({ field, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <textarea
                value={value || ""}
                name={field.key}
                disabled={field.readonly}
                readOnly={field.readonly}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={inputBase}
            />
        </div>
    );
}
