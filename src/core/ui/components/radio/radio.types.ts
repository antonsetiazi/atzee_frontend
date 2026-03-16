// src/core/ui/components/radio/radio.types.ts

import type { ReactNode } from "react";

export interface RadioProps {
    value: string;
    label?: string;
    description?: string;
    disabled?: boolean;
    className?: string;
}

export interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    children: ReactNode;
    direction?: "vertical" | "horizontal";
    className?: string;
}
