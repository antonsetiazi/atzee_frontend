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
        <div className="bg-white rounded-lg shadow-sm p-6 w-full">
            <div className="text-sm font-medium text-gray-500">
                {block.title}
            </div>
            <div className="mt-3 flex items-end gap-2">
                <div className="text-3xl font-semibold text-gray-900">
                    {formatValue(value, block.meta)}
                </div>
                {block.suffix && (
                    <div className="pb-1 text-sm font-medium text-gray-400">
                        {block.suffix}
                    </div>
                )}
            </div>
        </div>
    );
}
