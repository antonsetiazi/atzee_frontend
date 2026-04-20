// src/business/entities/blocks/BlockListingSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import ListingSection from "@/modules/listing/components/sections/ListingSection";
import { useServiceSection } from "@/modules/listing/hooks/useServiceSection";

export default function BlockListingSection({ block }: any) {
    const navigate = useNavigate();

    const { items } = useServiceSection(block.section_type);

    function handleClick(item: any) {
        navigate(`/service/${item.id}`);
    }

    return (
        <div className="px-4 py-4">
            <ListingSection
                title={block.title}
                items={items.slice(0, block.limit || 4)}
                onItemClick={handleClick}
            />
        </div>
    );
}
