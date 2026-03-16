// src/core/ui/icons/Icon.tsx

import clsx from "clsx";
import type { SVGProps } from "react";
import { iconRegistry } from "./icon.registry";

interface Props extends SVGProps<SVGSVGElement> {
    name: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "muted" | "primary";
}

const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
};

export default function Icon({
    name,
    size = "md",
    variant = "default",
    className = "",
    ...rest
}: Props) {
    const Component = iconRegistry[name];

    if (!Component) return null;

    return (
        <Component
            className={clsx(
                sizeMap[size],
                "shrink-0",
                "transition-all duration-200 ease-out",
                "text-current",
                variant === "muted" && "opacity-70",
                variant === "primary" && "text-[var(--color-primary)]",
                className,
            )}
            aria-hidden={rest["aria-label"] ? undefined : true}
            {...rest}
        />
    );
}
