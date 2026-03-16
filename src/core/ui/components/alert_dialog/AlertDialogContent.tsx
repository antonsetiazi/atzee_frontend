// // src/core/ui/components/alert_dialog/AlertDialogContent.tsx

import type { AlertDialogSectionProps } from "./alert_dialog.types";

export default function AlertDialogContent({
    children,
    className = "",
}: AlertDialogSectionProps) {
    return (
        <div
            className={`
                px-6
                pt-2
                pb-4
                text-sm
                text-[var(--text-secondary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
