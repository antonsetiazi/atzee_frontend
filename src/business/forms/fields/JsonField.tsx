/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { JsonFieldSchema } from "./field.types";

interface Props {
    field: JsonFieldSchema;
    value?: any;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function JsonField({ field, value, error, onChange }: Props) {
    // initialize once
    const [text, setText] = useState<string>(() => {
        if (value === undefined || value === null) return "";
        try {
            return JSON.stringify(value, null, 2);
        } catch {
            return "";
        }
    });

    const handleChange = (val: string) => {
        setText(val);

        try {
            const parsed = val ? JSON.parse(val) : null;
            onChange?.(field.key, parsed);
        } catch {
            // invalid JSON → do not propagate yet
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-medium text-sm">
                {field.label}
                {field.required && " *"}
            </label>

            <textarea
                className="border rounded p-2 font-mono text-sm"
                rows={6}
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter valid JSON"
            />

            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}
