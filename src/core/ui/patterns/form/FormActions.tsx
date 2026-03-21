// src/core/ui/patterns/form/FormActions.tsx

import React from "react";
import { Button } from "@/core/ui/components";
import { cn } from "@/core/utils/cn";

interface FormActionsProps {
    /**
     * Tombol utama (Save / Submit)
     */
    primaryLabel?: string;
    onPrimaryClick?: () => void;
    primaryLoading?: boolean;

    /**
     * Tombol sekunder (Cancel / Back)
     */
    secondaryLabel?: string;
    onSecondaryClick?: () => void;

    /**
     * Custom override (kalau mau inject sendiri)
     */
    children?: React.ReactNode;

    /**
     * Alignment
     */
    align?: "left" | "right" | "between";

    /**
     * Sticky di bawah (untuk form panjang)
     */
    sticky?: boolean;

    className?: string;
}

const alignMap = {
    left: "justify-start",
    right: "justify-end",
    between: "justify-between",
};

export default function FormActions({
    primaryLabel = "Save",
    onPrimaryClick,
    primaryLoading = false,

    secondaryLabel = "Cancel",
    onSecondaryClick,

    children,
    align = "right",
    sticky = false,
    className,
}: FormActionsProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 pt-4",
                alignMap[align],

                // Sticky behavior (premium UX)
                sticky &&
                    "sticky bottom-0 bg-[var(--color-bg-base)] border-t border-[var(--color-border-muted)] py-3 px-4 z-10",

                className,
            )}
        >
            {children ? (
                children
            ) : (
                <>
                    {secondaryLabel && (
                        <Button variant="ghost" onClick={onSecondaryClick}>
                            {secondaryLabel}
                        </Button>
                    )}

                    {primaryLabel && (
                        <Button
                            onClick={onPrimaryClick}
                            loading={primaryLoading}
                        >
                            {primaryLabel}
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
