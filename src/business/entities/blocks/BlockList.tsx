/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockList.tsx

import { useEffect, useState } from "react";
import { fetchEntityDetail } from "../api/entity.api";

interface Props {
    block: any;
    entityKey: string;
    context?: Record<string, any>;
    onSelect?: (field: string, value: any) => void;
}

export default function BlockList({ block, context, onSelect }: Props) {
    const [data, setData] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(
        block.selectable === "multiple" ? [] : null,
    );

    useEffect(() => {
        async function load() {
            let url = block.data_source;

            // Replace dynamic params {partner_id}, {product_id}, dll
            if (context) {
                Object.keys(context).forEach((key) => {
                    url = url.replace(`{${key}}`, context[key]);
                });
            }

            const res = await fetchEntityDetail(url);
            setData(res);
        }

        load();
    }, [block.data_source, context]);

    function handleSelect(item: any) {
        const value = item[block.value_key || "id"];

        if (block.selectable === "single") {
            setSelected(value);
            onSelect?.(block.bind_to_field, value);
        }

        if (block.selectable === "multiple") {
            let updated: any[] = selected || [];
            if (updated.includes(value)) {
                updated = updated.filter((v) => v !== value);
            } else {
                updated = [...updated, value];
            }
            setSelected(updated);
            onSelect?.(block.bind_to_field, updated);
        }
    }

    return (
        <div className="w-full">
            {block.title && (
                <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
            )}

            <div className="flex flex-col gap-2">
                {data.map((item: any, idx: number) => {
                    const value = item[block.value_key || "id"];
                    const isSelected =
                        block.selectable === "single"
                            ? selected === value
                            : selected?.includes?.(value);

                    return (
                        <label
                            key={idx}
                            className={`cursor-pointer flex items-center gap-3 p-2 border rounded transition-all ${
                                isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                            }`}
                        >
                            {(block.selectable === "single" && (
                                <input
                                    type="radio"
                                    name={block.bind_to_field}
                                    checked={isSelected}
                                    onChange={() => handleSelect(item)}
                                />
                            )) ||
                                (block.selectable === "multiple" && (
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelect(item)}
                                    />
                                ))}

                            <div className="flex-1">
                                {block.fields?.map((field: any) => {
                                    const val = item[field.key];

                                    if (field.format === "currency") {
                                        return (
                                            <div
                                                key={field.key}
                                                className="font-medium"
                                            >
                                                Rp{" "}
                                                {Number(val).toLocaleString()}
                                            </div>
                                        );
                                    }

                                    if (field.format === "duration") {
                                        return (
                                            <div
                                                key={field.key}
                                                className="text-sm text-gray-500"
                                            >
                                                {val} menit
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={field.key}
                                            className="text-sm"
                                        >
                                            {val}
                                        </div>
                                    );
                                })}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
