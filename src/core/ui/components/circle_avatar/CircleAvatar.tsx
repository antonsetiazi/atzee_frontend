// src/core/ui/components/circle_avatar/CircleAvatar.tsx

import { useState } from "react";
import type { CircleAvatarProps } from "./circle_avatar.types";

export default function CircleAvatar({
    src,
    name,
    size = "md",
    alt,
    className = "",
}: CircleAvatarProps) {
    const [error, setError] = useState(false);

    const sizeMap = {
        xs: "w-6 h-6 text-[10px]",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
    };

    const initials = name
        ? name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "?";

    if (src && !error) {
        return (
            <img
                src={src}
                alt={alt || name}
                onError={() => setError(true)}
                className={`
                    ${sizeMap[size]}
                    rounded-full
                    object-cover
                    bg-[var(--color-surface-alt)]
                    border border-[var(--color-border)]
                    ${className}
                `}
            />
        );
    }

    return (
        <div
            className={`
                ${sizeMap[size]}
                rounded-full
                flex
                items-center
                justify-center
                font-medium
                bg-[var(--color-surface-alt)]
                text-[var(--text-primary)]
                border border-[var(--color-border)]
                select-none
                ${className}
            `}
        >
            {initials}
        </div>
    );
}
