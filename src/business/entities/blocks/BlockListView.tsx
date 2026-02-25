/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockListView.tsx

import { formatValue } from "@/shared/utils/formatValue";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    block: any;
    data: any[]; // 🔥 data dari Page
    value?: any; // controlled (optional)
    onSelect?: (field: string, value: any) => void;
}

export default function BlockListView({
    block,
    data = [],
    value,
    onSelect,
}: Props) {
    const navigate = useNavigate();
    const [internalSelected, setInternalSelected] = useState<any>(null);

    const selected = value ?? internalSelected;
    const safeData = Array.isArray(data) ? data : [];

    function handleClick(item: any) {
        const val = item[block.value_key || "id"];

        // 🔥 CASE 1: Navigation
        if (
            block.selectable === "none" &&
            block.tile?.action?.type === "navigate"
        ) {
            let to = block.tile.action.to;
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

    return (
        <div className="w-full space-y-4">
            {block.title && (
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                    {block.title}
                </h3>
            )}

            {safeData.length === 0 ? (
                <div className="w-full space-y-4">
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                        <div className="text-base font-semibold text-gray-700">
                            {block.empty_title || "No data found"}
                        </div>

                        {block.empty_description && (
                            <div className="mt-2 text-sm text-gray-500">
                                {block.empty_description}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}

            {safeData.map((item: any, idx: number) => {
                const val = item[block.value_key || "id"];

                const isSelected =
                    block.selectable === "single"
                        ? selected === val
                        : selected?.includes?.(val);

                function renderField(config?: any) {
                    if (!config?.key) return null;

                    const raw = item[config.key];
                    return formatValue(raw, config);
                }

                function renderStatus(config?: any) {
                    if (!config?.key) return null;

                    const value = item[config.key];

                    const getStatusStyle = (status: string) => {
                        switch (status) {
                            case "PENDING_PAYMENT":
                                return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
                            case "PAID":
                                return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
                            case "CANCELLED":
                                return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
                            default:
                                return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
                        }
                    };

                    return (
                        <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                                value,
                            )}`}
                        >
                            {formatValue(value, config)}
                        </span>
                    );
                }

                return (
                    <div
                        key={idx}
                        onClick={() => handleClick(item)}
                        className={`
                        group relative overflow-hidden rounded-2xl
                        bg-white transition-all duration-300 cursor-pointer
                        border
                        ${
                            isSelected
                                ? "border-blue-500 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                        }
                    `}
                    >
                        {/* Accent line */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-5">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex-1 min-w-0 space-y-1">
                                    {/* Title */}
                                    <div className="text-base font-semibold text-gray-900 truncate">
                                        {renderField(block.tile.title)}
                                    </div>

                                    {/* Subtitle */}
                                    {block.tile.subtitle && (
                                        <div className="text-sm text-gray-600">
                                            {renderField(block.tile.subtitle)}
                                        </div>
                                    )}

                                    {/* Description */}
                                    {block.tile.description && (
                                        <div className="text-sm text-gray-500">
                                            {renderField(
                                                block.tile.description,
                                            )}
                                        </div>
                                    )}

                                    {/* Meta */}
                                    {block.tile?.meta && (
                                        <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2 text-xs text-gray-500">
                                            {Object.entries(
                                                block.tile.meta,
                                            ).map(([label, config]: any) => (
                                                <div key={label}>
                                                    <span className="text-gray-400">
                                                        {label}:
                                                    </span>{" "}
                                                    <span className="text-gray-700 font-medium">
                                                        {renderField(config)}
                                                        {config?.suffix && (
                                                            <span className="ml-1 text-gray-400">
                                                                {config.suffix}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Trailing */}
                                {block.tile.trailing && (
                                    <div className="text-right shrink-0">
                                        <div className="text-sm text-gray-400">
                                            {/* optional label later */}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {renderField(block.tile.trailing)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom row */}
                            <div className="mt-4 flex items-center justify-between">
                                {block.tile?.status &&
                                    renderStatus(block.tile.status)}

                                {block.tile?.action?.type === "navigate" && (
                                    <div className="text-xs text-gray-400">
                                        Tap to view detail →
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
