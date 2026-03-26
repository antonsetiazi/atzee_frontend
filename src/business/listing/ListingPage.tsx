// src/business/listing/ListingPage.tsx

import { useNavigate } from "react-router-dom";
import ListingView from "@/core/ui/views/listing/ListingView";
import { useProductListing, useServiceListing } from "./listing.hooks";
import type {
    ProductListing,
    ServiceListing,
} from "@/core/ui/views/listing/listing.types";

/* ===========================
   UNION TYPE
   =========================== */
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

    /* ===========================
       HANDLE CLICK (TYPE SAFE)
       =========================== */
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
