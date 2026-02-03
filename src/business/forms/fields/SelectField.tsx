/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/SelectField.tsx

import { useEffect, useState } from "react";
import type { FieldDataSource, SelectFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";
import { fetchFieldOptions } from "./field.api";

interface Option {
    label: string;
    value: string | number;
}
interface Props {
    field: SelectFieldSchema;
    value?: string | number;
    onChange?: (name: string, value: any) => void;
}

export default function SelectField({ field, value, onChange }: Props) {
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let alive = true;

        // ✅ 1. STATIC OPTIONS
        if (field.options && field.options.length > 0) {
            setOptions(field.options);
            return;
        }

        // ✅ 2. DYNAMIC OPTIONS
        const dataSource = field.data_source;
        if (!dataSource) return;

        async function load(ds: FieldDataSource) {
            setLoading(true);
            try {
                const opts = await fetchFieldOptions(ds);
                // console.log(opts);
                if (alive) setOptions(opts);
            } catch (err) {
                console.error(
                    "Failed to load select options:",
                    dataSource,
                    err,
                );
            } finally {
                if (alive) setLoading(false);
            }
        }

        load(dataSource);

        return () => {
            alive = false;
        };
    }, [field.options, field.data_source]);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            <select
                value={value ?? ""}
                disabled={field.readonly}
                required={field.required}
                onChange={(e) => onChange?.(field.key, e.target.value)}
                className={inputBase}
            >
                <option value="">
                    {loading ? "Loading..." : "-- Select --"}
                </option>

                {options.map((opt, idx) => (
                    <option
                        key={`${field.key}:${opt.value}:${idx}`}
                        value={opt.value}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
