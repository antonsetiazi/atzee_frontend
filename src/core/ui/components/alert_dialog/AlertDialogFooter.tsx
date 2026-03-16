// src/core/ui/components/alert_dialog/AlertDialogFooter.tsx

import type { AlertDialogSectionProps } from "./alert_dialog.types";

export default function AlertDialogFooter({
    children,
    className = "",
}: AlertDialogSectionProps) {
    return (
        <div
            className={`
                px-6
                pb-6
                flex
                justify-end
                gap-3
                ${className}
            `}
        >
            {children}
        </div>
    );
}
