// src/core/ui/components/heading/heading.types.ts

import type { ReactNode } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";

export interface HeadingProps {
    level?: HeadingLevel;

    children: ReactNode;

    weight?: HeadingWeight;

    muted?: boolean;

    align?: "left" | "center" | "right";

    className?: string;
}
