/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { DurationFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: DurationFieldSchema;
    value?: string;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

function normalizeDuration(value?: string) {
    if (!value) return { hours: "", minutes: "", seconds: "" };

    const parts = value.split(":");
    return {
        hours: parts[0] ?? "",
        minutes: parts[1] ?? "",
        seconds: parts[2] ?? "",
    };
}

export default function DurationField({
    field,
    value,
    error,
    onChange,
}: Props) {
    const [state, setState] = useState(normalizeDuration(value));

    useEffect(() => {
        setState(normalizeDuration(value));
    }, [value]);

    function handleChange(key: "hours" | "minutes" | "seconds", val: string) {
        const updated = { ...state, [key]: val };
        setState(updated);

        const formatted = `${updated.hours || "00"}:${updated.minutes || "00"}:${updated.seconds || "00"}`;

        onChange?.(field.key, formatted);
    }

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
                {field.label}
                {field.required && " *"}
            </label>

            <div className="flex items-center gap-2 w-72">
                <input
                    type="number"
                    placeholder="HH"
                    min={0}
                    value={state.hours}
                    onChange={(e) => handleChange("hours", e.target.value)}
                    className={`${inputBase} text-center`}
                />

                <span className="text-gray-500 dark:text-gray-400 text-sm">
                    :
                </span>

                <input
                    type="number"
                    placeholder="MM"
                    min={0}
                    max={59}
                    value={state.minutes}
                    onChange={(e) => handleChange("minutes", e.target.value)}
                    className={`${inputBase} text-center`}
                />

                <span className="text-gray-500 dark:text-gray-400 text-sm">
                    :
                </span>

                <input
                    type="number"
                    placeholder="SS"
                    min={0}
                    max={59}
                    value={state.seconds}
                    onChange={(e) => handleChange("seconds", e.target.value)}
                    className={`${inputBase} text-center`}
                />
            </div>

            {/* Helper */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Format: Hours : Minutes : Seconds
            </p>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
