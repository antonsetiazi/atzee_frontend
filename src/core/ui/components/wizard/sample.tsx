import { useState } from "react";
import { Stepper } from "@/core/ui/components";
import { WizardFooter } from "@/core/ui/components";

export default function WizardSample() {
    const [step, setStep] = useState(0);

    const steps = [
        { id: "account", title: "Account" },
        { id: "profile", title: "Profile" },
        { id: "confirm", title: "Confirm" },
    ];

    return (
        <div className="max-w-3xl mx-auto p-8">
            <Stepper steps={steps} currentStep={step} onStepChange={setStep}>
                {step === 0 && <div>Account Form</div>}
                {step === 1 && <div>Profile Form</div>}
                {step === 2 && <div>Confirm Data</div>}

                <WizardFooter
                    isFirstStep={step === 0}
                    isLastStep={step === steps.length - 1}
                    onBack={() => setStep(step - 1)}
                    onNext={() => setStep(step + 1)}
                    onCancel={() => alert("Cancel")}
                />
            </Stepper>
        </div>
    );
}
