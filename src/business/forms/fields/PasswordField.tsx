// src/business/forms/fields/PasswordField.tsx

import type { PasswordFieldSchema } from "./field.types";
import { inputBase, inputError } from "./field.ui";

interface Props {
    field: PasswordFieldSchema;
    value?: string;
    error?: string;
    onChange?: (name: string, value: string) => void;
}

export default function PasswordField({
    field,
    value,
    error,
    onChange,
}: Props) {
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
                type="password"
                name={field.key}
                value={value ?? ""}
                disabled={field.disabled}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={`${inputBase} ${error ? inputError : ""}`}
                placeholder={field.placeholder || ""}
            />
            {error && (
                <span className="mt-1 text-xs text-red-500">{error}</span>
            )}
        </div>
    );
}
