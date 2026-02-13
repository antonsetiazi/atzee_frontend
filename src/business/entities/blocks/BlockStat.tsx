/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockStat.tsx

import { formatValue } from "@/core/dashboard/utils/formatValue";

interface Props {
    block: any;
}

export default function BlockStat({ block }: Props) {
    return (
        <div className="p-5">
            <div className="text-sm font-medium text-gray-500">
                {block.title}
            </div>
            <div className="mt-3 flex items-end gap-2">
                <div className="text-3xl font-semibold text-gray-900">
                    {formatValue(block.value, block.meta)}
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
