// src/core/ui/components/banner/Banner.tsx

import { useState } from "react";
import type { BannerProps } from "./banner.types";

const variantStyles = {
    info: `
        bg-blue-50
        border-blue-200
        text-blue-900
    `,
    success: `
        bg-green-50
        border-green-200
        text-green-900
    `,
    warning: `
        bg-yellow-50
        border-yellow-200
        text-yellow-900
    `,
    error: `
        bg-red-50
        border-red-200
        text-red-900
    `,
};

const defaultIcons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "⛔",
};

export default function Banner({
    title,
    children,
    icon,
    variant = "info",
    dismissible = false,
    onClose,
    className = "",
}: BannerProps) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    function handleClose() {
        setVisible(false);

        onClose?.();
    }

    return (
        <div
            className={`
                flex
                gap-3
                items-start
                p-4
                border
                rounded-[var(--radius)]
                ${variantStyles[variant]}
                ${className}
            `}
        >
            {/* Icon */}

            <div className="text-sm mt-[2px]">
                {icon || defaultIcons[variant]}
            </div>

            {/* Content */}

            <div className="flex-1">
                {title && (
                    <div className="font-semibold text-sm mb-1">{title}</div>
                )}

                {children && (
                    <div className="text-sm opacity-90">{children}</div>
                )}
            </div>

            {/* Close */}

            {dismissible && (
                <button
                    onClick={handleClose}
                    className="
                        text-sm
                        opacity-70
                        hover:opacity-100
                    "
                >
                    ✕
                </button>
            )}
        </div>
    );
}
