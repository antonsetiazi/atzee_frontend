// src/core/ui/components/badge/badge.types.ts

import type { ReactNode } from "react";

export type BadgeVariant = "solid" | "soft" | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeColor =
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "neutral";

export interface BadgeProps {
    children: ReactNode;

    variant?: BadgeVariant;

    size?: BadgeSize;

    color?: BadgeColor;

    rounded?: boolean;

    className?: string;
}
