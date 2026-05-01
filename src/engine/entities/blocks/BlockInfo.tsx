// src/engine/entities/blocks/BlockInfo.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatValue } from "@/shared/utils/formatValue";

interface Props {
    block: any;
    data?: any;
}

export default function BlockInfo({ block, data }: Props) {
    // console.log(block.meta);
    const value = block.value ?? data?.[block.key] ?? null;
    return (
        <div className="py-3">
            {/* Title */}
            <div
                className="text-xs font-medium tracking-wide"
                style={{
                    color: "var(--text-muted)",
                }}
            >
                {block.title}
            </div>

            {/* Value */}
            <div
                className="mt-1 text-sm sm:text-base font-semibold tracking-tight"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {formatValue(value, block.meta)}

                {block.suffix && (
                    <span
                        className="ml-1 text-sm font-medium"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {block.suffix}
                    </span>
                )}
            </div>

            {/* Description  */}
            {block.description && (
                <div
                    className="mt-1 text-xs"
                    style={{
                        color: "var(--text-muted)",
                    }}
                >
                    {block.description}
                </div>
            )}
        </div>
    );
}
