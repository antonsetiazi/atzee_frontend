// src/core/form-engine/fields/SelectDataField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchFieldOptions } from "@/core/form-engine/data/fieldOptions.api";
import type {
    FieldProps,
    SelectOption,
} from "@/core/ui/components/fields/field.types";
import { SelectField } from "@/core/ui/components";

interface Props extends FieldProps {
    dataSource?: string;
    requestMethod?: "GET" | "POST";
    dataOptions?: SelectOption[];
    params?: Record<string, any>;
    formValues?: Record<string, any>;
}

export default function SelectDataField({
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
    formValues,
    onChange,
}: Props) {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);

    /**
     * cegah onChange("") berulang
     */
    const clearedRef = useRef(false);

    /**
     * Resolve params dynamic:
     * { country_id: "{{country_id}}" }
     * => { country_id: 2 }
     */
    const resolvedParams = useMemo(() => {
        return resolveParams(params ?? {}, (key) => formValues?.[key]);
    }, [params, formValues]);

    /**
     * dependency stabil
     */
    const dependencyKey = useMemo(() => {
        return JSON.stringify({
            dataSource,
            params: resolvedParams,
        });
    }, [dataSource, resolvedParams]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            /**
             * STATIC OPTIONS
             */
            if (dataOptions?.length) {
                setOptions(dataOptions);
                return;
            }

            /**
             * NO DATASOURCE
             */
            if (!dataSource) {
                setOptions([]);
                return;
            }

            /**
             * Jika ada dependency kosong
             * contoh region butuh country_id
             */
            const hasEmptyDependency = Object.values(resolvedParams).some(
                (v) => v === "" || v === null || v === undefined,
            );

            if (hasEmptyDependency) {
                if (!mounted) return;

                setOptions([]);

                if (value && !clearedRef.current) {
                    clearedRef.current = true;
                    onChange?.(name ?? "", "");
                }

                return;
            }

            clearedRef.current = false;

            try {
                setLoading(true);

                const items = await fetchFieldOptions(
                    dataSource,
                    resolvedParams,
                );

                if (!mounted) return;

                setOptions(items);

                /**
                 * kalau selected value sudah tidak ada
                 * reset sekali saja
                 */
                const exists = items.some(
                    (item) => String(item.value) === String(value),
                );

                if (value && !exists && !clearedRef.current) {
                    clearedRef.current = true;
                    onChange?.(name ?? "", "");
                }
            } catch (err) {
                console.error("Failed loading datasource:", dataSource, err);

                if (mounted) {
                    setOptions([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [
        dependencyKey,
        dataOptions,
        dataSource,
        name,
        onChange,
        resolvedParams,
        value,
    ]);

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

function resolveParams(
    params: Record<string, any>,
    getValue?: (key: string) => any,
) {
    const output: Record<string, any> = {};

    Object.entries(params).forEach(([key, val]) => {
        if (
            typeof val === "string" &&
            val.startsWith("{{") &&
            val.endsWith("}}")
        ) {
            const fieldName = val.replace("{{", "").replace("}}", "").trim();

            output[key] = getValue?.(fieldName);
        } else {
            output[key] = val;
        }
    });

    return output;
}
