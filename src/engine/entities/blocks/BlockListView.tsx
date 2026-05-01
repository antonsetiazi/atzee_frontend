// src/engine/entities/blocks/BlockListView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { formatValue } from "@/shared/utils/formatValue";
import { useState } from "react";

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
            SmartNavigate.go(to);
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

    return (
        <div className="w-full space-y-4">
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

                    function getStatusStyle(status: string) {
                        switch (status) {
                            case "PENDING_PAYMENT":
                                return {
                                    background: "var(--status-warning-bg)",
                                    color: "var(--status-warning-text)",
                                    border: "1px solid var(--status-warning-border)",
                                };
                            case "PAID":
                                return {
                                    background: "var(--status-success-bg)",
                                    color: "var(--status-success-text)",
                                    border: "1px solid var(--status-success-border)",
                                };
                            case "CANCELLED":
                                return {
                                    background: "var(--status-danger-bg)",
                                    color: "var(--status-danger-text)",
                                    border: "1px solid var(--status-danger-border)",
                                };
                            default:
                                return {
                                    background: "var(--color-surface-alt)",
                                    color: "var(--text-secondary)",
                                    border: "1px solid var(--color-border)",
                                };
                        }
                    }
                    return (
                        <span
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={getStatusStyle(value)}
                        >
                            {formatValue(value, config)}
                        </span>
                    );
                }

                return (
                    <div
                        key={idx}
                        onClick={() => handleClick(item)}
                        className="group relative overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            boxShadow: isSelected
                                ? "0 0 0 1px var(--color-primary)"
                                : "none",
                        }}
                    >
                        {/* Accent line */}
                        <div
                            className="absolute left-0 top-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                background: "var(--color-primary)",
                            }}
                        />
                        <div className="p-5">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex-1 min-w-0 space-y-1">
                                    {/* Title */}
                                    <div
                                        className="text-base font-semibold truncate"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {renderField(block.tile.title)}
                                    </div>

                                    {/* Subtitle */}
                                    {block.tile.subtitle && (
                                        <div
                                            className="text-sm"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {renderField(block.tile.subtitle)}
                                        </div>
                                    )}

                                    {/* Description */}
                                    {block.tile.description && (
                                        <div
                                            className="text-sm"
                                            style={{
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {renderField(
                                                block.tile.description,
                                            )}
                                        </div>
                                    )}

                                    {/* Meta */}
                                    {block.tile?.meta && (
                                        <div
                                            className="flex flex-wrap gap-x-6 gap-y-1 pt-2 text-xs"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {Object.entries(
                                                block.tile.meta,
                                            ).map(([label, config]: any) => (
                                                <div key={label}>
                                                    <span
                                                        style={{
                                                            color: "var(--text-muted)",
                                                        }}
                                                    >
                                                        {label}:
                                                    </span>{" "}
                                                    <span
                                                        className="font-medium"
                                                        style={{
                                                            color: "var(--text-primary)",
                                                        }}
                                                    >
                                                        {renderField(config)}
                                                        {config?.suffix && (
                                                            <span
                                                                className="ml-1"
                                                                style={{
                                                                    color: "var(--text-muted)",
                                                                }}
                                                            >
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
                                        <div
                                            className="text-lg font-semibold"
                                            style={{
                                                color: "var(--text-primary)",
                                            }}
                                        >
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
                                    <div
                                        className="text-xs"
                                        style={{ color: "var(--text-muted)" }}
                                    >
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
