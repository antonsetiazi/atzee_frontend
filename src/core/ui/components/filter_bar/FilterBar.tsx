// src/core/ui/components/filter_bar/FilterBar.tsx

import React from "react";

interface FilterBarProps {
    children: React.ReactNode;
    className?: string;
}

export default function FilterBar({
    children,
    className = "",
}: FilterBarProps) {
    return (
        <div
            className={`
            flex items-center justify-between
            gap-4
            flex-wrap
            px-4 py-3
            rounded-default
            border border-default
            bg-surface
            shadow-default
            transition-all duration-200
            ${className}
        `}
        >
            {children}
        </div>
    );
}
