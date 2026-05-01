// src/engine/entities/blocks/BlockStat.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatValue } from "@/shared/utils/formatValue";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

interface Props {
    block: any;
    data?: any;
}

function getStatColor(key?: string) {
    switch (key) {
        case "booking_upcoming":
            return "#3B82F6";
        case "booking_active":
            return "#10B981";
        case "booking_completed":
            return "#6B7280";
        case "booking_total":
            return "#8B5CF6";
        default:
            return "var(--color-primary)";
    }
}

export default function BlockStat({ block, data }: Props) {
    const { isMobile } = useBreakpoint();

    const value = block.value ?? data ?? null;
    const color = getStatColor(block.key);

    const isEmpty = value === null || value === 0;

    return (
        <div
            className={`
                group relative overflow-hidden
                w-full rounded-2xl
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-lg
                ${isMobile ? "p-3" : "p-5"}
            `}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Soft Glow Accent */}
            <div
                className="
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                "
                style={{
                    background: `linear-gradient(135deg, ${color}10, transparent 65%)`,
                }}
            />

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between gap-3">
                <div
                    className={`
                        font-medium truncate
                        ${isMobile ? "text-[11px]" : "text-sm"}
                    `}
                    style={{
                        color: "var(--text-secondary)",
                        letterSpacing: "0.02em",
                    }}
                >
                    {block.title}
                </div>

                {/* Dot + Mini Badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div
                        className={`
                            rounded-full
                            ${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"}
                        `}
                        style={{ background: color }}
                    />
                </div>
            </div>

            {/* VALUE */}
            <div
                className={`
                    relative z-10 flex items-end gap-1.5
                    ${isMobile ? "mt-2" : "mt-4"}
                `}
            >
                <div
                    className={`
                        font-bold tracking-tight leading-none
                        transition-all duration-300
                        ${!isEmpty ? "group-hover:scale-[1.03]" : ""}
                        ${isMobile ? "text-lg" : "text-2xl sm:text-3xl"}
                    `}
                    style={{
                        color: isEmpty ? "var(--text-muted)" : color,
                    }}
                >
                    {isEmpty ? "0" : formatValue(value, block.meta)}
                </div>

                {block.suffix && (
                    <div
                        className={`
                            font-medium leading-none pb-0.5
                            ${isMobile ? "text-[10px]" : "text-sm"}
                        `}
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        {block.suffix}
                    </div>
                )}
            </div>

            {/* Footer Hint */}
            <div
                className={`
                    relative z-10
                    ${isMobile ? "mt-1 text-[10px]" : "mt-2 text-xs"}
                `}
                style={{
                    color: "var(--text-muted)",
                    opacity: 0.75,
                }}
            >
                {isEmpty ? "Belum ada data" : "Live summary"}
            </div>

            {/* Bottom Accent Line */}
            <div
                className="
                    absolute bottom-0 left-0 right-0 h-[2px]
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300
                    origin-left
                "
                style={{
                    background: color,
                }}
            />
        </div>
    );
}
