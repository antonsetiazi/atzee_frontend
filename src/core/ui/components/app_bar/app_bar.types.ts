// src/core/ui/components/app_bar/app_bar.types.ts

import type { ReactNode } from "react";

export interface AppBarProps {
    left?: ReactNode;
    title?: ReactNode;
    right?: ReactNode;
    sticky?: boolean;
    className?: string;
}
