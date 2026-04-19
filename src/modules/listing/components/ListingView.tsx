// src/modules/listing/components/ListingView.tsx

import { useState } from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import type { ListingFiltersState, ListingSort } from "../types/listing.types";

import type { ListingItem } from "../types/listing.shared";

import MobileListingLayout from "./layouts/MobileListingLayout";
import DesktopListingLayout from "./layouts/DesktopListingLayout";

interface Props {
    listings: ListingItem[];
    filters: ListingFiltersState;
    onChangeFilters: (filters: ListingFiltersState) => void;
    sort: ListingSort;
    onChangeSort: (value: ListingSort) => void;
    page: number;
    totalPages: number;
    onChangePage: (page: number) => void;
    onItemClick?: (listing: ListingItem) => void;
}

export default function ListingView(props: Props) {
    const { isMobile } = useBreakpoint();
    const [showFilter, setShowFilter] = useState(false);

    function handleResetFilters() {
        props.onChangeFilters({
            search: "",
            category: [],
            city: undefined,
            useMyLocation: false,
            radius: undefined,
            minPrice: undefined,
            maxPrice: undefined,
        });

        props.onChangePage(1);
    }

    const sharedProps = {
        ...props,
        showFilter,
        setShowFilter,
        onResetFilters: handleResetFilters,
    };

    return isMobile ? (
        <MobileListingLayout {...sharedProps} />
    ) : (
        <DesktopListingLayout {...sharedProps} />
    );
}
