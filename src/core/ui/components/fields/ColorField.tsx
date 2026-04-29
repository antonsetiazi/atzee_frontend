// src/core/ui/components/fields/ColorField.tsx

import type { FieldProps } from "./field.types";
import { wrapper, label, input, error } from "./field.styles";

export default function ColorField({
    name,
    label: labelText,
    value,
    error: errorMessage,
    disabled,
    required,
    onChange,
}: FieldProps) {
    const current = value || "#000000";

    function handlePicker(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(name ?? "", e.target.value);
    }

    function handleText(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(name ?? "", e.target.value);
    }

    return (
        <div className={wrapper}>
            {labelText && (
                <label className={label}>
                    {labelText}
                    {required && <span> *</span>}
                </label>
            )}

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                }}
            >
                <input
                    type="color"
                    value={current}
                    disabled={disabled}
                    onChange={handlePicker}
                    style={{
                        width: 48,
                        height: 42,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                />

                <input
                    type="text"
                    value={current}
                    disabled={disabled}
                    onChange={handleText}
                    className={input}
                    style={{
                        flex: 1,
                    }}
                />
            </div>

            {errorMessage && <span className={error}>{errorMessage}</span>}
        </div>
    );
}
