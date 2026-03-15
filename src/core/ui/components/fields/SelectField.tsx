// src/core/ui/components/fields/SelectField.tsx

import type { FieldProps, SelectOption } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";

interface Props extends FieldProps {
    options?: SelectOption[];
    loading?: boolean;
}

export default function SelectField({
    name,
    label: labelText,
    value,
    placeholder,
    error: errorMessage,
    disabled,
    required,
    options = [],
    loading = false,
    onChange,
}: Props) {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
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

            <select
                name={name}
                value={value ?? ""}
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
            >
                <option value="">
                    {loading ? "Loading..." : (placeholder ?? "-- Select --")}
                </option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {errorMessage && (
                <span className={error} style={{ color: "var(--color-error)" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
