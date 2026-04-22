// src/core/ui/components/fields/PasswordField.tsx

import { useState } from "react";
import type { FieldProps } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";
import Icon from "../../icons/Icon";

export default function PasswordField({
    name,
    label: labelText,
    value,
    placeholder,
    error: errorMessage,
    disabled,
    required,
    onChange,
    autoComplete,
}: FieldProps) {
    const [show, setShow] = useState(false);

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

            <div className="relative">
                <input
                    name={name}
                    type={show ? "text" : "password"}
                    value={value ?? ""}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                    autoComplete={autoComplete ?? "new-password"}
                    className={input}
                    style={{
                        background: "var(--color-surface)",
                        border: `1px solid ${
                            errorMessage
                                ? "var(--color-error)"
                                : "var(--color-border)"
                        }`,
                        color: "var(--text-primary)",
                        paddingRight: "40px",
                    }}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ color: "var(--text-muted)" }}
                >
                    <Icon name={show ? "eye-off" : "eye"} size="md" />
                </button>
            </div>

            {errorMessage && (
                <span className={error} style={{ color: "var(--color-error)" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
