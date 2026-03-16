// src/core/ui/components/stepper/Stepper.types.ts

import type { ReactNode } from "react";

export interface StepperStep {
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
    disabled?: boolean;
}

export interface StepperProps {
    steps: StepperStep[];
    currentStep: number;
    onStepChange?: (index: number) => void;
    children?: ReactNode;
    className?: string;
}
