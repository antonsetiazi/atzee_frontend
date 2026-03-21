// src/core/ui/patterns/form/FormGrid.tsx

import React from "react";
import { cn } from "@/core/utils/cn";

interface FormGridProps {
    children: React.ReactNode;

    /**
     * Jumlah kolom (desktop)
     */
    columns?: 1 | 2 | 3 | 4;

    /**
     * Gap antar field
     */
    gap?: "sm" | "md" | "lg";

    className?: string;
}

const columnMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

const gapMap = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
};

export default function FormGrid({
    children,
    columns = 2,
    gap = "md",
    className,
}: FormGridProps) {
    return (
        <div
            className={cn(
                "grid w-full",
                columnMap[columns],
                gapMap[gap],
                className,
            )}
        >
            {children}
        </div>
    );
}
