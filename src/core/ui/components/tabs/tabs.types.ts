// src/core/ui/components/tabs/tabs.types.ts

import type { ReactNode } from "react";

export interface TabsProps {
    value: string;
    onChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}

export interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}
