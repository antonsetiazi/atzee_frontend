/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NumberFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: NumberFieldSchema;
    value?: number;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function NumberField({ field, value, error, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <input
                type="number"
                value={value ?? ""}
                disabled={field.disabled}
                required={field.required}
                onChange={(e) =>
                    onChange?.(
                        field.key,
                        e.target.value === "" ? null : Number(e.target.value),
                    )
                }
                className={inputBase}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
