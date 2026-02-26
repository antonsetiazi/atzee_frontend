/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/TextFields.tsx

import type { TextFieldSchema } from "./field.types";
import { inputBase, inputError } from "./field.ui";

interface Props {
    field: TextFieldSchema;
    value?: string;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function TextField({ field, value, error, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1.5">
            {/* Label */}
            <label
                htmlFor={field.key}
                className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
                {field.label}
                {field.required && (
                    <span className="ml-1 text-[var(--color-danger)]">*</span>
                )}
            </label>

            <input
                type="text"
                name={field.key}
                value={value ?? ""}
                disabled={field.disabled}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={`${inputBase} ${error ? inputError : ""}`}
            />

            {/* Error */}
            {error && (
                <p className="text-xs font-medium text-[var(--color-danger)]">
                    {error}
                </p>
            )}
        </div>
    );
}
