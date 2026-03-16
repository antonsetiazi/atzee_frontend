import { useState } from "react";
import { Radio, RadioGroup } from "@/core/ui/components";

export default function RadioSample() {
    const [payment, setPayment] = useState("card");

    return (
        <div className="p-10 space-y-10">
            {/* Controlled Example */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Payment Method (Controlled)
                </h2>

                <RadioGroup value={payment} onChange={setPayment}>
                    <Radio
                        value="card"
                        label="Credit Card"
                        description="Pay using Visa, Mastercard, or Amex"
                    />

                    <Radio
                        value="bank"
                        label="Bank Transfer"
                        description="Transfer directly from your bank account"
                    />

                    <Radio
                        value="cash"
                        label="Cash"
                        description="Pay with cash on delivery"
                    />
                </RadioGroup>

                <div className="text-sm text-[var(--text-muted)]">
                    Selected: <b>{payment}</b>
                </div>
            </div>

            {/* Uncontrolled Example */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Delivery Method (Uncontrolled)
                </h2>

                <RadioGroup defaultValue="standard">
                    <Radio value="standard" label="Standard Delivery" />

                    <Radio value="express" label="Express Delivery" />

                    <Radio value="pickup" label="Store Pickup" />
                </RadioGroup>
            </div>

            {/* Horizontal Layout */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Theme</h2>

                <RadioGroup defaultValue="light" direction="horizontal">
                    <Radio value="light" label="Light" />

                    <Radio value="dark" label="Dark" />

                    <Radio value="system" label="System" />
                </RadioGroup>
            </div>
        </div>
    );
}
