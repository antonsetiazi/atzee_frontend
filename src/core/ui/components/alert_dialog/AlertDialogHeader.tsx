// src/core/ui/components/alert_dialog/AlertDialogHeader.tsx

import type { AlertDialogSectionProps } from "./alert_dialog.types";

export default function AlertDialogHeader({
    children,
    className = "",
}: AlertDialogSectionProps) {
    return (
        <div
            className={`
                px-6
                pt-6
                text-lg
                font-semibold
                text-[var(--text-primary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
