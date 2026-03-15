// src/core/ui/components/progress_indicator/progress_indicator.types.ts

export type ProgressVariant = "bar" | "circle" | "indeterminate";

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressIndicatorProps {
    value?: number;
    max?: number;

    variant?: ProgressVariant;
    size?: ProgressSize;

    label?: string;

    className?: string;
}
