// src/core/ui/components/empty_state/EmptyState.tsx

import React from "react";

interface EmptyStateProps {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export default function EmptyState({
    icon,
    title = "No data",
    description = "There is nothing to display here yet.",
    action,
    className = "",
}: EmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
        >
            {icon && (
                <div className="mb-4 text-slate-400 flex items-center justify-center">
                    {icon}
                </div>
            )}

            {title && (
                <h3 className="text-lg font-semibold text-slate-200 mb-1">
                    {title}
                </h3>
            )}

            {description && (
                <p className="text-sm text-slate-400 max-w-md mb-4">
                    {description}
                </p>
            )}

            {action && <div>{action}</div>}
        </div>
    );
}
