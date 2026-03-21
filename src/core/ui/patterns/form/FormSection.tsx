// src/core/ui/patterns/form/FormSection.tsx

import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Heading,
} from "@/core/ui/components";

interface FormSectionProps {
    title?: string;
    description?: string;

    children: React.ReactNode;

    /**
     * Optional action di header (kanan)
     */
    headerAction?: React.ReactNode;

    /**
     * Optional footer (biasanya FormActions nanti)
     */
    footer?: React.ReactNode;

    className?: string;
}

export default function FormSection({
    title,
    description,
    children,
    headerAction,
    footer,
    className,
}: FormSectionProps) {
    return (
        <Card className={className}>
            {/* HEADER */}
            {(title || description || headerAction) && (
                <CardHeader>
                    <div className="flex items-start justify-between gap-5">
                        <div>
                            {title && <Heading level={4}>{title}</Heading>}

                            {description && (
                                <p className="text-sm opacity-70 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>

                        {headerAction && <div>{headerAction}</div>}
                    </div>
                </CardHeader>
            )}

            {/* CONTENT */}
            <CardContent>{children}</CardContent>

            {/* FOOTER */}
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}
