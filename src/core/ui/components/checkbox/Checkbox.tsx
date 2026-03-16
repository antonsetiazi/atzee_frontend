// src/core/ui/components/checkbox/Checkbox.tsx

import { useEffect, useRef, useState } from "react";
import type { CheckboxProps } from "./checkbox.types";

export default function Checkbox({
    checked,
    defaultChecked = false,
    disabled,
    label,
    description,
    indeterminate,
    onChange,
    className = "",
}: CheckboxProps) {
    const [internal, setInternal] = useState(defaultChecked);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internal;

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = !!indeterminate;
        }
    }, [indeterminate]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (disabled) return;

        const next = e.target.checked;

        if (!isControlled) {
            setInternal(next);
        }

        onChange?.(next);
    }

    return (
        <label
            className={`
            flex items-start gap-3
            select-none
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${className}
        `}
        >
            {/* Hidden Input */}
            <input
                ref={ref}
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                className="peer hidden"
            />

            {/* Checkbox UI */}
            <div
                className={`
                relative flex items-center justify-center
                w-5 h-5
                rounded
                border
                transition-all
                duration-200

                ${
                    isChecked
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                        : "bg-[var(--color-surface)] border-[var(--color-border)]"
                }

                peer-focus:ring-2
                peer-focus:ring-[var(--color-primary)]
            `}
            >
                {isChecked && (
                    <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>

            {(label || description) && (
                <div className="flex flex-col">
                    {label && (
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                            {label}
                        </span>
                    )}

                    {description && (
                        <span className="text-xs text-[var(--text-muted)]">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </label>
    );
}
