// src/core/ui/components/radio/radio.context.ts

import { createContext } from "react";

export interface RadioContextValue {
    value?: string;
    onChange: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioContextValue | null>(null);
