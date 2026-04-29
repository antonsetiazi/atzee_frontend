// src/core/ui/components/button/Button.tsx

import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { base, sizes, variants } from "./button.styles";
import type { ButtonProps } from "./button.types";

const Button = ({
    children,
    variant = "primary",
    size,
    loading = false,
    disabled = false,
    type = "button",
    fullWidth = false,
    icon,
    onClick,
}: ButtonProps) => {
    const { isMobile } = useBreakpoint();

    // Default responsive size:
    // mobile = lg
    // desktop = md
    const resolvedSize = size ?? (isMobile ? "lg" : "md");

    const style = variants[variant];

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                ${base}
                ${sizes[resolvedSize]}
                ${fullWidth ? "w-full" : ""}
            `}
            style={{
                background: style.background,
                color: style.color,
                border: style.border,
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {loading ? "" : icon}
            {children}
        </button>
    );
};

export default Button;
