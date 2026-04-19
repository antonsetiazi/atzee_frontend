// src/business/entities/blocks/BlockListingSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import ListingSection from "@/modules/listing/components/sections/ListingSection";

import { useNearbyServices } from "@/modules/listing/hooks/useNearbyServices";
import { usePopularServices } from "@/modules/listing/hooks/usePopularServices";
import { useNewestServices } from "@/modules/listing/hooks/useNewestServices";
import { useTopRatedServices } from "@/modules/listing/hooks/useTopRatedServices";
import { useCheapServices } from "@/modules/listing/hooks/useCheapServices";
import { useRecommendedServices } from "@/modules/listing/hooks/useRecommendedServices";

export default function BlockListingSection({ block }: any) {
    const navigate = useNavigate();

    const nearby = useNearbyServices();
    const popular = usePopularServices();
    const newest = useNewestServices();
    const topRated = useTopRatedServices();
    const cheap = useCheapServices();
    const recommended = useRecommendedServices();

    let items: any[] = [];

    switch (block.section_type) {
        case "nearby_services":
            items = nearby.items;
            break;

        case "new_services":
            items = newest.items;
            break;

        case "recommended_services":
            items = recommended.items;
            break;

        case "top_rated_services":
            items = topRated.items;
            break;

        case "cheap_services":
            items = cheap.items;
            break;

        case "popular_services":
        default:
            items = popular.items;
            break;
    }

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
