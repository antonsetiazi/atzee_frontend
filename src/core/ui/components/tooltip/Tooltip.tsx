// src/core/ui/components/tooltip/Tooltip.tsx

import React, { useState, useRef } from "react";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
    className?: string;
}

export default function Tooltip({
    content,
    children,
    position = "top",
    delay = 200,
    className = "",
}: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const show = () => {
        timeoutRef.current = window.setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const hide = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setVisible(false);
    };

    const positions = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={show}
            onMouseLeave={hide}
        >
            {children}

            <div
                className={`
                pointer-events-none absolute z-50
                whitespace-nowrap
                px-3 py-1.5
                text-xs
                rounded-md
                bg-slate-900
                text-white
                shadow-lg
                transition-all duration-200 ease-out
                ${positions[position]}
                ${
                    visible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-1 scale-95"
                }
                ${className}
            `}
            >
                {content}
            </div>
        </div>
    );
}
