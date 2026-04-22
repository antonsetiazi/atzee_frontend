// src/core/ui/components/fields/InputField.tsx

import type { FieldProps } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";

export default function InputField({
    name,
    label: labelText,
    value,
    placeholder,
    error: errorMessage,
    disabled,
    required,
    type = "text",
    autoComplete,
    onChange,
}: FieldProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

            <input
                name={name}
                type={type}
                value={value ?? ""}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleChange}
                autoComplete={autoComplete ?? "off"}
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

            {errorMessage && (
                <span className={error} style={{ color: "var(--color-error)" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
