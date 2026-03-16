// src/core/ui/components/checkbox/checkbox.types.ts

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;

    label?: string;
    description?: string;

    indeterminate?: boolean;

    onChange?: (checked: boolean) => void;

    className?: string;
}
