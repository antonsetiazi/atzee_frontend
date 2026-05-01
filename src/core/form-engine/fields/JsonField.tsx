// src/core/form-engine/fields/JsonField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { JsonFieldSchema } from "./types/field.types";

interface Props {
    field: JsonFieldSchema;
    value?: any;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function JsonField({ field, value, error, onChange }: Props) {
    const [draft, setDraft] = useState<string | null>(null);

    // 🔥 source of truth:
    const displayValue =
        draft !== null
            ? draft
            : value !== undefined && value !== null
              ? JSON.stringify(value, null, 2)
              : "";

    const handleChange = (val: string) => {
        setDraft(val);

        try {
            const parsed = val ? JSON.parse(val) : null;
            onChange?.(field.key, parsed);

            // kalau valid → reset draft (sync ke value)
            setDraft(null);
        } catch {
            // invalid JSON → tetap di draft mode
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
                style={{
                    background: "white",
                    border: `1px solid ${
                        error ? "var(--color-error)" : "var(--color-border)"
                    }`,
                    color: "var(--text-primary)",
                }}
                rows={6}
                value={displayValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter valid JSON"
            />

            {error && (
                <span style={{ color: "var(--color-error)" }}>{error}</span>
            )}
        </div>
    );
}
