// src/core/ui/components/modal/modal.types.ts

import type { ReactNode } from "react";

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
}

export interface ModalSectionProps {
    children: ReactNode;
    className?: string;
}
