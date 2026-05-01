// src/engine/entities/blocks/BlockListingSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListingSection from "@/modules/listing/components/sections/ListingSection";
import { useServiceSection } from "@/modules/listing/hooks/useServiceSection";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function BlockListingSection({ block }: any) {
    const { items } = useServiceSection(block.section_type);

    function handleClick(item: any) {
        SmartNavigate.go(`/service/${item.id}`);
    }

    return (
        <div className="px-2 py-2">
            <ListingSection
                title={block.title}
                items={items.slice(0, block.limit || 4)}
                onItemClick={handleClick}
            />
        </div>
    );
}
