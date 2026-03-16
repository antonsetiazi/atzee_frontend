// src/core/ui/components/wizard/WizardFooter.tsx

import clsx from "clsx";
import type { WizardFooterProps } from "./WizardFooter.types";

export default function WizardFooter({
    onBack,
    onNext,
    onCancel,

    backLabel = "Back",
    nextLabel = "Next",
    cancelLabel = "Cancel",

    isFirstStep,
    isLastStep,

    loading,
    disableNext,

    align = "between",

    className,
}: WizardFooterProps) {
    return (
        <div
            className={clsx(
                "mt-8 pt-4",
                "border-t",
                "flex items-center",
                align === "between" ? "justify-between" : "justify-end gap-3",
                className,
            )}
            style={{
                borderColor: "var(--color-border)",
            }}
        >
            {/* Left Side */}

            <div>
                {!isFirstStep && onBack && (
                    <button
                        onClick={onBack}
                        className="px-4 py-2 rounded-md text-sm font-medium transition"
                        style={{
                            background: "var(--color-surface-alt)",
                            color: "var(--text-primary)",
                        }}
                    >
                        {backLabel}
                    </button>
                )}
            </div>

            {/* Right Side */}

            <div className="flex items-center gap-3">
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md text-sm font-medium transition"
                        style={{
                            background: "transparent",
                            color: "var(--text-muted)",
                        }}
                    >
                        {cancelLabel}
                    </button>
                )}

                {onNext && (
                    <button
                        onClick={onNext}
                        disabled={disableNext || loading}
                        className={clsx(
                            "px-5 py-2 rounded-md text-sm font-medium transition",
                            "disabled:opacity-50",
                        )}
                        style={{
                            background: "var(--color-primary)",
                            color: "white",
                        }}
                    >
                        {loading
                            ? "Loading..."
                            : isLastStep
                              ? "Finish"
                              : nextLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
