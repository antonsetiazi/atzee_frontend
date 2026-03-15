// src/core/ui/components/button/Button.tsx

import { base, sizes, variants } from "./button.styles";
import type { ButtonProps } from "./button.types";

const Button = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    type = "button",
    fullWidth = false,
    icon,
    onClick,
}: ButtonProps) => {
    const style = variants[variant];

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${base} ${sizes[size]} ${fullWidth ? "w-full" : ""}`}
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
