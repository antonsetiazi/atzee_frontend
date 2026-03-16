// src/core/ui/components/switch/switch.types.ts

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    label?: string;
    description?: string;

    size?: "sm" | "md" | "lg";

    onChange?: (checked: boolean) => void;

    className?: string;
}
