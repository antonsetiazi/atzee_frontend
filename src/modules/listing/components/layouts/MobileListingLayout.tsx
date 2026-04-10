// src/modules/listing/components/layouts/MobileListingLayout.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListingHeader from "../sections/ListingHeader";
import ListingControls from "../sections/ListingControls";
import ListingGridSection from "../sections/ListingGridSection";
import ListingPagination from "../ListingPagination";
import MobileFilterDrawer from "../sections/MobileFilterDrawer";

export default function MobileListingLayout(props: any) {
    return (
        <div className="flex flex-col h-full">
            <ListingHeader
                mobile
                filters={props.filters}
                onChangeFilters={props.onChangeFilters}
            />

            <div className="p-4 space-y-4">
                <ListingControls
                    mobile
                    sort={props.sort}
                    onChangeSort={props.onChangeSort}
                    onOpenFilter={() => props.setShowFilter(true)}
                />

                <ListingGridSection
                    mobile
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

            <MobileFilterDrawer
                open={props.showFilter}
                filters={props.filters}
                onChangeFilters={props.onChangeFilters}
                onClose={() => props.setShowFilter(false)}
            />
        </div>
    );
}
