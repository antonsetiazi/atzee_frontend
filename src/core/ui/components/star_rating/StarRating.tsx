// src/core/ui/components/star_rating/StarRating.tsx

import React from "react";

interface Props {
    value: number; // current rating (e.g. 4.2)
    max?: number; // default 5

    size?: number; // px (default 20)
    gap?: number; // px (default 4)

    readOnly?: boolean;

    onChange?: (value: number) => void;

    showValue?: boolean; // show numeric rating
}

export default function StarRating({
    value,
    max = 5,
    size = 20,
    gap = 4,
    readOnly = true,
    onChange,
    showValue = false,
}: Props) {
    const stars = Array.from({ length: max });

    const handleClick = (index: number) => {
        if (readOnly || !onChange) return;
        onChange(index + 1);
    };

    return (
        <div className="flex items-center">
            <div className="flex" style={{ gap: `${gap}px` }}>
                {stars.map((_, i) => {
                    const fill = Math.min(Math.max(value - i, 0), 1);
                    // 0 → empty
                    // 0.5 → half
                    // 1 → full

                    return (
                        <Star
                            key={i}
                            size={size}
                            fill={fill}
                            onClick={() => handleClick(i)}
                            interactive={!readOnly}
                        />
                    );
                })}
            </div>

            {showValue && (
                <span
                    className="ml-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
}

// ==========================
// Sub Component
// ==========================

interface StarProps {
    size: number;
    fill: number; // 0 - 1
    onClick?: () => void;
    interactive?: boolean;
}

function Star({ size, fill, onClick, interactive }: StarProps) {
    const id = React.useId();

    return (
        <svg
            onClick={onClick}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={
                interactive
                    ? "cursor-pointer transition-transform hover:scale-110"
                    : ""
            }
        >
            <defs>
                <linearGradient id={id}>
                    <stop
                        offset={`${fill * 100}%`}
                        stopColor="var(--color-warning)"
                    />
                    <stop
                        offset={`${fill * 100}%`}
                        stopColor="var(--color-border)"
                    />
                </linearGradient>
            </defs>

            <path
                fill={`url(#${id})`}
                d="M12 .587l3.668 7.431L24 9.748l-6 5.857 
                1.416 8.262L12 18.896l-7.416 4.971L6 
                15.605 0 9.748l8.332-1.73z"
            />
        </svg>
    );
}
