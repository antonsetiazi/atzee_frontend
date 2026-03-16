import { useState } from "react";
import { Stepper } from "@/core/ui/components/";

export default function StepperSample() {
    const [step, setStep] = useState(0);

    const steps = [
        {
            id: "account",
            title: "Account",
            description: "Create your account",
        },
        {
            id: "profile",
            title: "Profile",
            description: "Personal information",
        },
        {
            id: "confirmation",
            title: "Confirmation",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto p-8">
            <Stepper steps={steps} currentStep={step} onStepChange={setStep}>
                {step === 0 && <div>Step 1 Content</div>}

                {step === 1 && <div>Step 2 Content</div>}

                {step === 2 && <div>Step 3 Content</div>}
            </Stepper>

            <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(step - 1)} disabled={step === 0}>
                    Back
                </button>

                <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === steps.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
