// src/core/ui/components/button/button.types.ts

import type { ReactNode } from "react";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "success";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    icon?: ReactNode;
    onClick?: () => void;
}
