// src/core/ui/components/stepper/Stepper.tsx

import clsx from "clsx";
import StepperItem from "./StepperItem";
import { StepperContext } from "./StepperContext";
import type { StepperProps } from "./Stepper.types";

export default function Stepper({
    steps,
    currentStep,
    onStepChange,
    children,
    className,
}: StepperProps) {
    const goTo = (index: number) => {
        if (onStepChange) {
            onStepChange(index);
        }
    };

    const progress =
        steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

    return (
        <StepperContext.Provider
            value={{
                currentStep,
                totalSteps: steps.length,
                goTo,
            }}
        >
            <div
                className={clsx(
                    "w-full rounded-[var(--radius)]",
                    "bg-[var(--color-surface)]",
                    "shadow-[var(--shadow)]",
                    className,
                )}
            >
                {/* Step Indicator Container */}

                <div className="p-6">
                    {/* Progress Line Background */}

                    <div className="relative mb-8">
                        <div
                            className="absolute top-4 left-0 w-full h-[2px]"
                            style={{
                                background: "var(--color-border)",
                            }}
                        />

                        {/* Progress Line */}

                        <div
                            className="absolute top-4 left-0 h-[2px] transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                                background: "var(--color-primary)",
                            }}
                        />

                        {/* Steps */}

                        <div className="relative flex justify-between">
                            {steps.map((step, index) => (
                                <StepperItem
                                    key={step.id}
                                    step={step}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}

                    <div className="pt-2">{children}</div>
                </div>
            </div>
        </StepperContext.Provider>
    );
}
