// src/core/ui/components/stepper/StepperContext.tsx

import { createContext, useContext } from "react";

interface StepperContextValue {
    currentStep: number;
    totalSteps: number;
    goTo: (step: number) => void;
}

export const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepper() {
    const ctx = useContext(StepperContext);

    if (!ctx) {
        throw new Error("Stepper components must be used inside <Stepper>");
    }

    return ctx;
}
