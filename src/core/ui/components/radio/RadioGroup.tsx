// src/core/ui/components/radio/RadioGroup.tsx

import { useState } from "react";
import { RadioGroupContext } from "./radio.context";
import type { RadioGroupProps } from "./radio.types";

export default function RadioGroup({
    value,
    defaultValue,
    onChange,
    children,
    direction = "vertical",
    className = "",
}: RadioGroupProps) {
    const [internal, setInternal] = useState(defaultValue);

    const isControlled = value !== undefined;
    const selected = isControlled ? value : internal;

    function handleChange(v: string) {
        if (!isControlled) {
            setInternal(v);
        }

        onChange?.(v);
    }

    return (
        <RadioGroupContext.Provider
            value={{
                value: selected,
                onChange: handleChange,
            }}
        >
            <div
                className={`
                flex
                ${direction === "vertical" ? "flex-col" : "flex-row"}
                gap-3
                ${className}
            `}
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
}
