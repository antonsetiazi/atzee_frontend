// src/core/ui/components/wizard/WizardFooter.types.ts

export interface WizardFooterProps {
    onBack?: () => void;
    onNext?: () => void;
    onCancel?: () => void;

    backLabel?: string;
    nextLabel?: string;
    cancelLabel?: string;

    isFirstStep?: boolean;
    isLastStep?: boolean;

    loading?: boolean;

    disableNext?: boolean;

    align?: "between" | "right";

    className?: string;
}
