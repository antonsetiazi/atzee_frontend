// src/business/listing/ListingPage.tsx

import { useNavigate } from "react-router-dom";
import ListingView from "@/core/ui/views/listing/ListingView";
import { useListing } from "./listing.hooks";

interface Props {
    type?: "product" | "service";
}

export default function ListingPage({ type }: Props) {
    const navigate = useNavigate();

    const {
        listings,
        filters,
        setFilters,
        sort,
        setSort,
        page,
        setPage,
        totalPages,
    } = useListing(type);

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
            onItemClick={(item) => {
                navigate(
                    item.type === "product"
                        ? `/product/${item.id}`
                        : `/service/${item.id}`,
                );
            }}
        />
    );
}
