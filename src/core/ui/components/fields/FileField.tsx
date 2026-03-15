// src/core/ui/components/fields/FileField.tsx

import type { FieldProps } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";

interface Props extends FieldProps {
    accept?: string;
    multiple?: boolean;
}

export default function FileField({
    name,
    label: labelText,
    value,
    error: errorMessage,
    disabled,
    required,
    accept,
    multiple,
    onChange,
}: Props) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;

        if (multiple) {
            onChange?.(name ?? "", Array.from(files));
        } else {
            onChange?.(name ?? "", files[0]);
        }
    }

    return (
        <div className={wrapper}>
            {labelText && (
                <label className={label}>
                    {labelText}
                    {required && (
                        <span style={{ color: "var(--color-error)" }}> *</span>
                    )}
                </label>
            )}

            <input
                type="file"
                name={name}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={handleChange}
                className={input}
                style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${
                        errorMessage
                            ? "var(--color-error)"
                            : "var(--color-border)"
                    }`,
                    color: "var(--text-primary)",
                }}
            />

            {/* Preview single file */}
            {!multiple && value instanceof File && (
                <div className="text-xs opacity-70">Selected: {value.name}</div>
            )}

            {errorMessage && (
                <span className={error} style={{ color: "var(--color-error)" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
