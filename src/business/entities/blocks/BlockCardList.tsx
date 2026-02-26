/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockCardList.tsx

import { formatValue } from "@/shared/utils/formatValue";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    block: any;
    data: any[]; // ← data dikirim dari Page
    context?: Record<string, any>;
    value?: any; // optional controlled value
    onSelect?: (field: string, value: any) => void;
}

export default function BlockCardList({
    block,
    data = [],
    value,
    onSelect,
}: Props) {
    const navigate = useNavigate();
    const [internalSelected, setInternalSelected] = useState<any>(null);
    const selected = value ?? internalSelected;
    const safeData = Array.isArray(data) ? data : [];

    function handleSelect(item: any) {
        const val = item[block.value_key || "id"];

        // 🔥 CASE 1: Navigation mode
        if (
            block.selectable === "none" &&
            block.item_action?.type === "navigate"
        ) {
            let to = block.item_action.to;

            // replace {id}
            to = to.replace("{id}", val);

            navigate(to);
            return;
        }

        // 🔥 CASE 2: Single select
        if (block.selectable === "single") {
            setInternalSelected(val);
            onSelect?.(block.bind_to_field, val);
            return;
        }

        // 🔥 CASE 3: Multiple select
        if (block.selectable === "multiple") {
            let updated = selected || [];

            if (updated.includes(val)) {
                updated = updated.filter((v: any) => v !== val);
            } else {
                updated = [...updated, val];
            }

            setInternalSelected(updated);
            onSelect?.(block.bind_to_field, updated);
        }
    }
    // console.log(data);
    // console.log(block.data_key);
    return (
        <div className="w-full space-y-4">
            {block.title && (
                <div className="px-1">
                    <h3 className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                        {block.title}
                    </h3>
                </div>
            )}

            <div className="flex flex-wrap gap-4 justify-start">
                {safeData.map((item: any, idx: number) => {
                    const val = item[block.value_key || "id"];

                    const isSelected =
                        block.selectable === "single"
                            ? selected === val
                            : selected?.includes?.(val);

                    return (
                        <div
                            key={idx}
                            onClick={() => handleSelect(item)}
                            className={`
                                group relative cursor-pointer rounded-2xl border bg-[var(--color-surface)] 
                                p-3 transition-all duration-200
                                ${
                                    isSelected
                                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-md"
                                        : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-sm"
                                }
                                flex-shrink-0
                                w-full sm:w-[48%] md:w-[32%] lg:w-[23%]
                            `}
                        >
                            {/* Subtle top accent when selected */}
                            {isSelected && (
                                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-[var(--color-primary)]" />
                            )}

                            <div className="space-y-2">
                                {block.fields?.map((field: any) => {
                                    const fieldVal = item[field.key];
                                    // console.log(field);
                                    // 🔥 IMAGE VARIANT
                                    if (
                                        field.meta?.type === "image" &&
                                        fieldVal
                                    ) {
                                        return (
                                            <div
                                                key={field.key}
                                                className="mb-3 w-full aspect-[4/3] overflow-hidden rounded-xl"
                                            >
                                                <img
                                                    src={fieldVal}
                                                    alt="image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={field.key}
                                            className={`
                                                ${
                                                    field.variant === "primary"
                                                        ? "text-base font-semibold text-[var(--color-text-primary)]"
                                                        : "text-sm text-[var(--color-text-secondary)]"
                                                }
                                            `}
                                        >
                                            {formatValue(fieldVal, field.meta)}
                                            {field.suffix && (
                                                <span className="ml-1 text-xs text-[var(--color-text-muted)]">
                                                    {field.suffix}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
