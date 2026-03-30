// src/core/ui/components/alert_dialog/alert_dialog.types.ts

import type { ReactNode } from "react";

export interface AlertDialogProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
}

export interface AlertDialogSectionProps {
    children: ReactNode;
    className?: string;
}
