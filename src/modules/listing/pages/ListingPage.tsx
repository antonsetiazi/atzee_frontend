// src/modules/listing/pages/ListingPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { ListingItem } from "../types/listing.shared";
import { useServiceListing } from "../hooks/useServiceListing";
import { useProductListing } from "../hooks/useProductListing";
import ListingView from "../components/ListingView";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
// import CategorySlider from "@/modules/category/components/CategorySlider";

interface Props {
    type?: "product" | "service";
}

export default function ListingPage({ type }: Props) {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    const productData = useProductListing();
    const serviceData = useServiceListing();

    const {
        listings,
        filters,
        setFilters,
        sort,
        setSort,
        page,
        setPage,
        totalPages,
    } = type === "product" ? productData : serviceData;

    useEffect(() => {
        if (!categoryFromUrl) return;

        setFilters((prev: any) => ({
            ...prev,
            category: [categoryFromUrl],
        }));
    }, [categoryFromUrl, setFilters]);

    function handleItemClick(item: ListingItem) {
        if (item.type === "product") {
            SmartNavigate.go(`/product/${item.id}`);
            return;
        }

        SmartNavigate.go(`/service/${item.id}`);
    }

    return (
        <>
            {/* <CategorySlider /> */}
            <ListingView
                listings={listings}
                filters={filters}
                onChangeFilters={setFilters}
                sort={sort}
                onChangeSort={setSort}
                page={page}
                totalPages={totalPages}
                onChangePage={setPage}
                onItemClick={handleItemClick}
            />
        </>
    );
}
