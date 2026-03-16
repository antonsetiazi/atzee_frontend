// src/core/ui/components/filter_bar/FilterGroup.tsx

import React from "react";

interface FilterGroupProps {
    children: React.ReactNode;
    align?: "left" | "right";
    className?: string;
}

export default function FilterGroup({
    children,
    align = "left",
    className = "",
}: FilterGroupProps) {
    return (
        <div
            className={`
            flex items-center gap-2
            ${align === "right" ? "ml-auto" : ""}
            ${className}
        `}
        >
            {children}
        </div>
    );
}
