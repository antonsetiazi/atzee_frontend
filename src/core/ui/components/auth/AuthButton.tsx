// src/core/ui/components/auth/AuthButton.tsx

import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    loading?: boolean;
    onClick?: () => void;
    variant?: "primary" | "topbar";
}

export default function AuthButton({
    children,
    loading,
    onClick,
    variant = "primary",
}: Props) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={clsx(
                "relative overflow-hidden",
                "flex items-center justify-center gap-2",
                "text-sm font-medium",
                "transition-all duration-200",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "focus:outline-none",
                "cursor-pointer",

                variant === "primary" && "px-4 py-2",
                variant === "topbar" && "px-3 py-1.5",
            )}
            style={{
                borderRadius: "var(--radius)",
                color: "white",

                background: `
                    linear-gradient(
                        135deg,
                        var(--color-primary),
                        color-mix(in srgb, var(--color-primary) 85%, black)
                    )
                `,

                boxShadow: `
                    0 1px 2px rgba(0,0,0,0.06),
                    0 4px 10px rgba(0,0,0,0.08)
                `,
            }}
        >
            {/* subtle highlight */}
            <span
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background:
                        "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
            />

            {/* content */}
            <span className="relative z-10 flex items-center gap-2">
                {loading ? "Please wait..." : children}
            </span>
        </button>
    );
}
