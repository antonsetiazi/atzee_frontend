// src/core/ui/components/header_page/types.ts

import type { ReactNode, ElementType } from "react";

export interface HeaderAction {
    label: string;

    icon?: ElementType;

    onClick?: () => void;

    href?: string;

    variant?: "primary" | "secondary" | "ghost";

    hidden?: boolean;
    disabled?: boolean;

    mobileOnly?: boolean;
    desktopOnly?: boolean;

    badge?: string | number;

    children?: HeaderAction[];

    render?: () => ReactNode;
}
