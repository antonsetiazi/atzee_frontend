// src/core/ui/icons/IconContainer.tsx

import clsx from "clsx";
import Icon from "./Icon";

interface Props {
    icon: string;
    size?: "sm" | "md" | "lg";
    tone?: "default" | "primary";
}

const containerSize = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9",
};

export default function IconContainer({
    icon,
    size = "md",
    tone = "default",
}: Props) {
    return (
        <div
            className={clsx(
                "flex items-center justify-center rounded-md",
                "transition-all duration-200",
                containerSize[size],
            )}
            style={{
                background:
                    tone === "primary"
                        ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
                        : "var(--color-surface-alt)",
            }}
        >
            <Icon
                name={icon}
                size={size === "lg" ? "md" : "sm"}
                variant={tone === "primary" ? "primary" : "default"}
            />
        </div>
    );
}
