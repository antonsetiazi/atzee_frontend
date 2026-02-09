/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/forms/fields/SelectField.tsx

import { useEffect, useState } from "react";
import type { SelectFieldSchema } from "./field.types";
import { inputBase } from "./field.ui";
import { fetchFieldOptions } from "./field.api";

interface Option {
    label: string;
    value: string | number;
}
interface Props {
    field: SelectFieldSchema;
    value?: string | number;
    error?: string;
    onChange?: (name: string, value: any) => void;
}

export default function SelectField({ field, value, error, onChange }: Props) {
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
        if (!field.data_source) return;

        const dataSource: string = field.data_source;
        async function load() {
            setLoading(true);
            try {
                const opts = await fetchFieldOptions(dataSource);
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

        load();

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

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
