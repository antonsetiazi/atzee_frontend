// src/core/ui/components/radio/Radio.tsx

import { useRadioGroup } from "./useRadioGroup";
import type { RadioProps } from "./radio.types";

export default function Radio({
    value,
    label,
    description,
    disabled,
    className = "",
}: RadioProps) {
    const ctx = useRadioGroup();

    const checked = ctx.value === value;

    function handleSelect() {
        if (disabled) return;
        ctx.onChange(value);
    }

    return (
        <label
            className={`
            flex items-start gap-3
            select-none
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${className}
        `}
            onClick={handleSelect}
        >
            <div
                className={`
                flex items-center justify-center
                w-5 h-5
                rounded-full
                border
                transition-all
                duration-200
                ${
                    checked
                        ? "border-[var(--color-primary)]"
                        : "border-[var(--color-border)]"
                }
            `}
            >
                {checked && (
                    <div
                        className="
                        w-2.5
                        h-2.5
                        rounded-full
                        bg-[var(--color-primary)]
                    "
                    />
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
