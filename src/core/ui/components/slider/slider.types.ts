// src/core/ui/components/slider/slider.types.ts

export interface SliderProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    showValue?: boolean;
    disabled?: boolean;
    onChange?: (value: number) => void;
    className?: string;
}
