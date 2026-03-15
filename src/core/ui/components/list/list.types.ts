// src/core/ui/components/list/list.types.ts

import type { ReactNode } from "react";

export interface ListViewProps {
    children: ReactNode;
    divided?: boolean;
    className?: string;
}

export interface ListTileProps {
    leading?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    trailing?: ReactNode;
    onClick?: () => void;
    className?: string;
}
