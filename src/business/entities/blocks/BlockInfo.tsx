/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockInfo.tsx

import { formatValue } from "@/core/dashboard/utils/formatValue";

interface Props {
    block: any;
    data?: any;
}

export default function BlockInfo({ block, data }: Props) {
    // console.log(block.meta);
    const value = block.value ?? data?.[block.key] ?? null;
    return (
        <div className="p-4 sm:p-5">
            {/* Title */}
            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                {block.title}
            </div>

            {/* Value + Suffix */}
            <div className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                {formatValue(value, block.meta)}
                {block.suffix && (
                    <span className="ml-1 text-gray-400 font-medium text-sm">
                        {block.suffix}
                    </span>
                )}
            </div>

            {/* Optional description / meta info */}
            {block.description && (
                <div className="mt-1 text-xs text-gray-400">
                    {block.description}
                </div>
            )}
        </div>
    );
}
