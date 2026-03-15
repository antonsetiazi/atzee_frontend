// src/core/ui/components/heading/Heading.tsx

import type { HeadingProps } from "./heading.types";
import type { ElementType } from "react";

export default function Heading({
    level = 1,
    children,
    weight = "semibold",
    muted = false,
    align = "left",
    className = "",
}: HeadingProps) {
    const Tag: ElementType = `h${level}`;

    const sizeMap = {
        1: "text-3xl md:text-4xl",
        2: "text-2xl md:text-3xl",
        3: "text-xl md:text-2xl",
        4: "text-lg md:text-xl",
        5: "text-base md:text-lg",
        6: "text-sm md:text-base",
    };

    const weightMap = {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
    };

    const alignMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    return (
        <Tag
            className={`
                ${sizeMap[level]}
                ${weightMap[weight]}
                ${alignMap[align]}
                leading-tight
                tracking-tight
                ${
                    muted
                        ? "text-[var(--text-secondary)]"
                        : "text-[var(--text-primary)]"
                }
                ${className}
            `}
        >
            {children}
        </Tag>
    );
}
