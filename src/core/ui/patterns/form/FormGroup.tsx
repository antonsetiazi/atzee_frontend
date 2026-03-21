// src/core/ui/patterns/form/FormGroup.tsx

import React from "react";
import { Heading, Card, CardContent } from "@/core/ui/components";
import { cn } from "@/core/utils/cn";

interface FormGroupProps {
    title?: string;
    description?: string;

    children: React.ReactNode;

    /**
     * Visual style
     */
    variant?: "default" | "card" | "ghost";

    /**
     * Spacing antar field
     */
    gap?: "sm" | "md" | "lg";

    className?: string;
}

const gapMap = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
};

export default function FormGroup({
    title,
    description,
    children,
    variant = "default",
    gap = "md",
    className,
}: FormGroupProps) {
    const content = (
        <div className={cn("flex flex-col", gapMap[gap])}>
            {/* Header */}
            {(title || description) && (
                <div>
                    {title && <Heading level={3}>{title}</Heading>}

                    {description && (
                        <p className="text-sm opacity-70 mt-1">{description}</p>
                    )}
                </div>
            )}

            {/* Fields */}
            <div className={cn("flex flex-col", gapMap[gap])}>{children}</div>
        </div>
    );

    // Variant: card (nested visual)
    if (variant === "card") {
        return (
            <Card className={className}>
                <CardContent>{content}</CardContent>
            </Card>
        );
    }

    // Variant: ghost (no visual wrapper)
    if (variant === "ghost") {
        return <div className={className}>{content}</div>;
    }

    // Default
    return <div className={className}>{content}</div>;
}
