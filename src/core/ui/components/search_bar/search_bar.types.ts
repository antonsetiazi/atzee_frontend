// src/core/ui/components/search_bar/search_bar.types.ts

import type { ReactNode } from "react";

export interface SearchBarProps {
    value?: string;
    placeholder?: string;
    autoFocus?: boolean;
    icon?: ReactNode;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    className?: string;
}
