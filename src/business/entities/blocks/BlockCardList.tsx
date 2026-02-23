/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockCardList.tsx

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
        <div className="w-full">
            {block.title && (
                <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
            )}

            <div
                className={`grid gap-4 ${
                    block.layout === "list"
                        ? "grid-cols-1"
                        : `grid-cols-${block.columns || 2}`
                }`}
            >
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
                            className={`cursor-pointer border rounded-lg p-4 transition-all ${
                                isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                            }`}
                        >
                            {block.fields?.map((field: any) => {
                                const fieldVal = item[field.key];

                                if (field.format === "currency") {
                                    return (
                                        <div
                                            key={field.key}
                                            className="font-medium"
                                        >
                                            Rp{" "}
                                            {Number(fieldVal).toLocaleString()}
                                        </div>
                                    );
                                }

                                if (field.format === "duration") {
                                    return (
                                        <div
                                            key={field.key}
                                            className="text-sm text-gray-500"
                                        >
                                            {fieldVal} menit
                                        </div>
                                    );
                                }

                                return (
                                    <div key={field.key} className="text-sm">
                                        {fieldVal}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
