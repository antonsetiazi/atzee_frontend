// src/modules/listing/components/layouts/DesktopListingLayout.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListingSidebarFilters from "../ListingSidebarFilters";
import ListingHeader from "../sections/ListingHeader";
import ListingControls from "../sections/ListingControls";
import ListingGridSection from "../sections/ListingGridSection";
import ListingPagination from "../ListingPagination";

export default function DesktopListingLayout(props: any) {
    return (
        <div className="flex">
            <ListingSidebarFilters
                filters={props.filters}
                onChange={props.onChangeFilters}
            />

            <div className="flex-1 p-6">
                <ListingHeader
                    filters={props.filters}
                    onChangeFilters={props.onChangeFilters}
                />

                <ListingControls
                    sort={props.sort}
                    onChangeSort={props.onChangeSort}
                />

                <ListingGridSection
                    listings={props.listings}
                    onItemClick={props.onItemClick}
                    onReset={props.onResetFilters}
                />

                <ListingPagination
                    page={props.page}
                    totalPages={props.totalPages}
                    onChange={props.onChangePage}
                />
            </div>
        </div>
    );
}
