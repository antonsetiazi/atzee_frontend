/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockStat.tsx

import { formatValue } from "@/shared/utils/formatValue";

interface Props {
    block: any;
    data?: any;
}

export default function BlockStat({ block, data }: Props) {
    // console.log(block.meta);
    const value = block.value ?? data?.[block.key] ?? null;
    return (
        <div
            className="w-full rounded-xl p-6"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Title */}
            <div
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
            >
                {block.title}
            </div>
            {/* Value */}
            <div className="mt-4 flex items-end gap-2">
                <div
                    className="text-3xl font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                >
                    {formatValue(value, block.meta)}
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
        </div>
    );
}
