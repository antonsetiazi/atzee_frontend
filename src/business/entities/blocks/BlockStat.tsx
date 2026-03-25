// src/business/entities/blocks/BlockStat.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatValue } from "@/shared/utils/formatValue";

interface Props {
    block: any;
    data?: any;
}

function getStatColor(key?: string) {
    switch (key) {
        case "booking_upcoming":
            return "#3B82F6"; // blue
        case "booking_active":
            return "#10B981"; // green
        case "booking_completed":
            return "#6B7280"; // gray
        case "booking_total":
            return "#8B5CF6"; // purple
        default:
            return "var(--color-primary)";
    }
}

export default function BlockStat({ block, data }: Props) {
    // console.log(block.meta);
    const value = block.value ?? data?.[block.key] ?? null;
    const color = getStatColor(block.key);

    const isEmpty = value === null || value === 0;

    return (
        <div
            className="
                group
                w-full rounded-2xl p-5
                transition-all duration-300
            "
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* 🔥 HEADER */}
            <div className="flex items-center justify-between">
                <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {block.title}
                </div>

                {/* 🔥 DOT INDICATOR */}
                <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: color }}
                />
            </div>

            {/* 🔥 VALUE */}
            <div className="mt-4 flex items-end gap-2">
                <div
                    className={`
                        text-2xl sm:text-3xl font-bold tracking-tight
                        transition-all duration-300
                        ${!isEmpty ? "group-hover:scale-105" : ""}
                    `}
                    style={{
                        color: isEmpty ? "var(--text-muted)" : color,
                    }}
                >
                    {isEmpty ? "0" : formatValue(value, block.meta)}
                </div>

                {block.suffix && (
                    <div
                        className="pb-1 text-sm font-medium"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {block.suffix}
                    </div>
                )}
            </div>

            {/* 🔥 EMPTY STATE MESSAGE */}
            {isEmpty && (
                <div
                    className="mt-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                >
                    Belum ada data
                </div>
            )}
        </div>
    );
}
