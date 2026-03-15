// src/core/ui/components/bottom_navigation_bar/bottom_navigation_bar.types.ts

import type { ReactNode } from "react";

export interface BottomNavigationItem {
    key: string;
    label: string;
    icon?: ReactNode;
    badge?: number;
}

export interface BottomNavigationBarProps {
    items: BottomNavigationItem[];
    activeKey?: string;
    onChange?: (key: string) => void;
    className?: string;
}
