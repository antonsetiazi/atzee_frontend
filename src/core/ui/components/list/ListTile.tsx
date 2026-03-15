// src/core/ui/components/list/ListTile.tsx

import type { ListTileProps } from "./list.types";

export default function ListTile({
    leading,
    title,
    subtitle,
    trailing,
    onClick,
    className = "",
}: ListTileProps) {
    const clickable = Boolean(onClick);

    return (
        <div
            onClick={onClick}
            className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                transition
                ${clickable ? "cursor-pointer hover:bg-[var(--color-surface-alt)]" : ""}
                ${className}
            `}
        >
            {/* Leading */}

            {leading && <div className="flex items-center">{leading}</div>}

            {/* Text */}

            <div className="flex-1 min-w-0">
                <div
                    className="
                    text-sm
                    font-medium
                    text-[var(--text-primary)]
                    truncate
                "
                >
                    {title}
                </div>

                {subtitle && (
                    <div
                        className="
                        text-xs
                        text-[var(--text-secondary)]
                        truncate
                    "
                    >
                        {subtitle}
                    </div>
                )}
            </div>

            {/* Trailing */}

            {trailing && <div className="flex items-center">{trailing}</div>}
        </div>
    );
}
