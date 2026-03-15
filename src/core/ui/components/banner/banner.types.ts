// src/core/ui/components/banner/banner.types.ts

import type { ReactNode } from "react";

export type BannerVariant = "info" | "success" | "warning" | "error";

export interface BannerProps {
    title?: ReactNode;
    children?: ReactNode;
    icon?: ReactNode;
    variant?: BannerVariant;
    dismissible?: boolean;
    onClose?: () => void;
    className?: string;
}
