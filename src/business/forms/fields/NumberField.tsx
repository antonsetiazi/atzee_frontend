/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NumberFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";

interface Props {
    field: NumberFieldSchema;
    value?: number;
    onChange?: (name: string, value: any) => void;
}

export default function NumberField({ field, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <input
                type="number"
                value={value ?? ""}
                disabled={field.readonly}
                required={field.required}
                onChange={(e) =>
                    onChange?.(
                        field.key,
                        e.target.value === "" ? null : Number(e.target.value),
                    )
                }
                className={inputBase}
            />
        </div>
    );
}
