// src/core/ui/components/slider/Slider.tsx

import type { SliderProps } from "./slider.types";

export default function Slider({
    value,
    min = 0,
    max = 100,
    step = 1,
    showValue = false,
    disabled = false,
    onChange,
    className = "",
}: SliderProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = Number(e.target.value);
        onChange?.(val);
    }

    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className={`w-full flex items-center gap-3 ${className}`}>
            {/* Slider */}

            <div className="relative flex-1">
                {/* Track */}

                <div
                    className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        w-full
                        h-[4px]
                        rounded-full
                        bg-[var(--color-border)]
                    "
                />

                {/* Progress */}

                <div
                    className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        h-[4px]
                        rounded-full
                        bg-[var(--color-primary)]
                    "
                    style={{ width: `${percent}%` }}
                />

                {/* Input */}

                <input
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    onChange={handleChange}
                    className="
                        relative
                        w-full
                        appearance-none
                        bg-transparent
                        cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
                        [&::-webkit-slider-thumb]:shadow
                        [&::-webkit-slider-thumb]:cursor-pointer
                    "
                />
            </div>

            {/* Value */}

            {showValue && (
                <div
                    className="
                        text-xs
                        text-[var(--text-secondary)]
                        min-w-[32px]
                        text-right
                    "
                >
                    {value}
                </div>
            )}
        </div>
    );
}
