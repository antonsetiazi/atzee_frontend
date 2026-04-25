// src/core/ui/components/fields/TextAreaField.tsx

import type { FieldProps } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";

export default function TextAreaField({
    name,
    label: labelText,
    value,
    placeholder,
    error: errorMessage,
    disabled,
    required,
    onChange,
}: FieldProps) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        onChange?.(name ?? "", e.target.value);
    }

    return (
        <div className={wrapper}>
            {labelText && (
                <label
                    className={label}
                    style={{ color: "var(--text-primary)" }}
                >
                    {labelText}
                    {required && (
                        <span style={{ color: "var(--color-error)" }}> *</span>
                    )}
                </label>
            )}

            <textarea
                name={name}
                value={value ?? ""}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleChange}
                rows={4}
                className={input}
                style={{
                    background: "white",
                    border: `1px solid ${
                        errorMessage
                            ? "var(--color-error)"
                            : "var(--color-border)"
                    }`,
                    color: "var(--text-primary)",
                    resize: "vertical",
                }}
            />

            {errorMessage && (
                <span className={error} style={{ color: "var(--color-error)" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
