/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/BooleanField.tsx

import type { BooleanFieldSchema } from "./field.types";

interface Props {
    field: BooleanFieldSchema;
    value?: boolean;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function BooleanField({ field, value, error, onChange }: Props) {
    return (
        <label className="flex items-center gap-2 text-sm">
            <input
                type="checkbox"
                checked={!!value}
                disabled={field.readonly}
                onChange={(e) => onChange?.(field.key, e.target.checked)}
                className="h-4 w-4"
            />
            <span>{field.label}</span>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </label>
    );
}
