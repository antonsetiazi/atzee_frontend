// src/core/ui/components/radio/useRadioGroup.ts

import { useContext } from "react";
import { RadioGroupContext } from "./radio.context";

export function useRadioGroup() {
    const ctx = useContext(RadioGroupContext);

    if (!ctx) {
        throw new Error("Radio must be used inside RadioGroup");
    }

    return ctx;
}
