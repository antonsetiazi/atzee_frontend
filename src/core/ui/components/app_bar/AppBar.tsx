// src/core/ui/components/app_bar/AppBar.tsx

import type { AppBarProps } from "./app_bar.types";

export default function AppBar({
    left,
    title,
    right,
    sticky = true,
    className = "",
}: AppBarProps) {
    return (
        <header
            className={`
                w-full
                h-14
                flex
                items-center
                justify-between
                px-4
                bg-[var(--color-surface)]
                border-b border-[var(--color-border)]
                ${sticky ? "sticky top-0 z-40" : ""}
                ${className}
            `}
        >
            {/* Left */}

            <div className="flex items-center gap-2">{left}</div>

            {/* Title */}

            <div
                className="
                flex-1
                text-center
                text-sm
                font-semibold
                text-[var(--text-primary)]
                truncate
            "
            >
                {title}
            </div>

            {/* Right */}

            <div className="flex items-center gap-2">{right}</div>
        </header>
    );
}
