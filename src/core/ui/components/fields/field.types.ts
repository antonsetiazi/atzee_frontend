// src/core/ui/components/fields/field.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FieldProps {
    name?: string;
    label?: string;
    value?: any;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    type?: string;
    options?: SelectOption[];
    onChange?: (name: string, value: any) => void;
}

export interface SelectOption {
    label: string;
    value: string | number;
}
