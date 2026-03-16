// src/core/ui/components/stepper/StepperItem.tsx

import type { StepperStep } from "./Stepper.types";
import { useStepper } from "./StepperContext";
import clsx from "clsx";

interface Props {
    step: StepperStep;
    index: number;
}

export default function StepperItem({ step, index }: Props) {
    const { currentStep, goTo } = useStepper();

    const isActive = currentStep === index;
    const isCompleted = index < currentStep;

    return (
        <button
            onClick={() => !step.disabled && goTo(index)}
            className="flex flex-col items-center gap-2 group"
        >
            {/* Circle */}

            <div
                className={clsx(
                    "relative flex items-center justify-center",
                    "w-8 h-8 rounded-full text-xs font-semibold",
                    "transition-all duration-300",

                    isCompleted && "text-white",

                    !isCompleted && "text-[var(--text-secondary)]",
                )}
                style={{
                    background: isCompleted
                        ? "var(--color-primary)"
                        : isActive
                          ? "var(--color-surface-alt)"
                          : "var(--color-surface)",

                    border: isActive
                        ? "2px solid var(--color-primary)"
                        : "2px solid var(--color-border)",

                    boxShadow: isActive ? "0 0 0 4px rgba(0,0,0,0.04)" : "none",
                }}
            >
                {isCompleted ? "✓" : index + 1}
            </div>

            {/* Title */}

            <div
                className="text-xs font-medium transition"
                style={{
                    color: isActive
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                }}
            >
                {step.title}
            </div>
        </button>
    );
}
