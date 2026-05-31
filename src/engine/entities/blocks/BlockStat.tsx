// src/engine/entities/blocks/BlockStat.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatValue } from "@/shared/utils/formatValue";
import { SummaryCard } from "@/core/ui/components";

interface Props {
    block: any;
    data?: any;
    isMobile: boolean;
}

export default function BlockStat({ block, data, isMobile }: Props) {
    const value = block.value ?? data ?? null;
    const isEmpty = value === null || value === 0;

    return (
        <SummaryCard
            title={block.title}
            value={isEmpty ? "0" : formatValue(value, block.meta)}
            subtitle={isEmpty ? "Belum ada data" : "Live summary"}
            tone="success"
            isMobile={isMobile}
        />
    );
}
