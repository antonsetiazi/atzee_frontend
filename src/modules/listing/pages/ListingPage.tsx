// src/modules/listing/pages/ListingPage.tsx

import { useNavigate } from "react-router-dom";
import type { ProductListing, ServiceListing } from "../types/listing.types";
import { useServiceListing } from "../hooks/useServiceListing";
import { useProductListing } from "../hooks/useProductListing";
import ListingView from "../components/ListingView";

type ListingItem = ProductListing | ServiceListing;

interface Props {
    type?: "product" | "service";
}

export default function ListingPage({ type }: Props) {
    const navigate = useNavigate();

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

    function handleItemClick(item: ListingItem) {
        if (item.type === "product") {
            navigate(`/product/${item.id}`);
            return;
        }

        navigate(`/service/${item.id}`);
    }

    return (
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
    );
}
