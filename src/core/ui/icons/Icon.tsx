// src/core/ui/icons/Icon.tsx

import type { SVGProps } from "react";
import { iconRegistry } from "./icon.registry";

interface Props extends SVGProps<SVGSVGElement> {
    name: string;
    size?: "sm" | "md" | "lg";
}

const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
};

export default function Icon({
    name,
    size = "md",
    className = "",
    ...rest
}: Props) {
    const Component = iconRegistry[name];

    if (!Component) return null;

    return (
        <Component
            className={`
                ${sizeMap[size]}
                shrink-0
                text-current
                ${className}
            `}
            aria-hidden={rest["aria-label"] ? undefined : true}
            {...rest}
        />
    );
}
