// src/core/ui/components/card/card.types.ts

import type { ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
    className?: string;
}

export interface CardSectionProps {
    children: ReactNode;
    className?: string;
}
