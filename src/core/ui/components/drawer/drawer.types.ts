// src/core/ui/components/drawer/drawer.types.ts

import type { ReactNode } from "react";

export interface DrawerProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    width?: string;
}

export interface DrawerSectionProps {
    children: ReactNode;
    className?: string;
}
