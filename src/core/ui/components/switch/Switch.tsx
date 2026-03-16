// src/core/ui/components/switch/Switch.tsx

import { useState } from "react";
import type { SwitchProps } from "./switch.types";

export default function Switch({
    checked,
    defaultChecked = false,
    disabled,
    label,
    description,
    size = "md",
    onChange,
    className = "",
}: SwitchProps) {
    const [internal, setInternal] = useState(defaultChecked);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internal;

    function toggle() {
        if (disabled) return;

        const next = !isChecked;

        if (!isControlled) {
            setInternal(next);
        }

        onChange?.(next);
    }

    const sizes = {
        sm: {
            track: "w-8 h-4",
            thumb: "w-3 h-3",
            translate: "translate-x-4",
        },
        md: {
            track: "w-11 h-6",
            thumb: "w-5 h-5",
            translate: "translate-x-5",
        },
        lg: {
            track: "w-14 h-7",
            thumb: "w-6 h-6",
            translate: "translate-x-7",
        },
    };

    const s = sizes[size];

    return (
        <div
            className={`flex items-center gap-3 select-none ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
            onClick={toggle}
            role="switch"
            aria-checked={isChecked}
        >
            {/* Switch */}
            <div
                className={`
                relative inline-flex items-center
                ${s.track}
                rounded-full
                border
                transition-all
                duration-300
                ease-out
                ${
                    isChecked
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                        : "bg-[var(--color-surface-alt)] border-[var(--color-border)]"
                }
            `}
            >
                <div
                    className={`
                    absolute
                    ${s.thumb}
                    bg-white
                    rounded-full
                    shadow
                    transition-transform
                    duration-300
                    ease-out
                    ${isChecked ? s.translate : "translate-x-1"}
                `}
                />
            </div>

            {/* Label */}
            {(label || description) && (
                <div className="flex flex-col">
                    {label && (
                        <span className="text-sm text-[var(--text-primary)] font-medium">
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
        </div>
    );
}
