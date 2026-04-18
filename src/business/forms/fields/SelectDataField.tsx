// src/business/forms/fields/SelectDataField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { fetchFieldOptions } from "@/business/forms/fields/field.api";
import type {
    FieldProps,
    SelectOption,
} from "@/core/ui/components/fields/field.types";
import { SelectField } from "@/core/ui/components";

interface Props extends FieldProps {
    dataSource?: string;
    dataOptions?: SelectOption[];
    params?: Record<string, any>;
}

export default function SelectDataSourceField({
    name,
    label,
    value,
    placeholder,
    error,
    disabled,
    required,
    dataOptions,
    dataSource,
    params,
    onChange,
}: Props) {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let alive = true;

        // 1️⃣ STATIC OPTIONS
        if (dataOptions && dataOptions.length > 0) {
            setOptions(dataOptions);
            return;
        }

        // 2️⃣ DYNAMIC OPTIONS
        if (!dataSource) return;

        const source = dataSource;

        async function load() {
            setLoading(true);

            try {
                const opts = await fetchFieldOptions(source, params ?? {});
                if (alive) setOptions(opts);
            } catch (err) {
                console.error("Failed loading datasource:", dataSource, err);
            } finally {
                if (alive) setLoading(false);
            }
        }

        load();

        return () => {
            alive = false;
        };
    }, [dataSource, dataOptions, params]);

    return (
        <SelectField
            name={name}
            label={label}
            value={value}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            required={required}
            options={options}
            loading={loading}
            onChange={onChange}
        />
    );
}
