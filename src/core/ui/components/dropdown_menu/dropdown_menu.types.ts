import type { ReactNode } from "react";

export interface DropdownMenuItem {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
}

export interface DropdownMenuProps {
    trigger: ReactNode;
    items: DropdownMenuItem[];
    align?: "left" | "right";
    width?: number;
    className?: string;
}
