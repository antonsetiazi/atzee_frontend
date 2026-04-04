// src/modules/listing_detail/hooks/useListingDetail.ts

import { useEffect, useState } from "react";
import { listingDetailApi } from "../api/listingDetail.api";
import { mapServiceDetailToListingDetail } from "../services/listingDetail.mapper";

import type { ListingDetail } from "../types/listingDetail.types";

export function useListingDetail(id?: string, type?: string) {
    const [data, setData] = useState<ListingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                if (!id) return;

                if (type === "service") {
                    const res = await listingDetailApi.getDetail(id);
                    const mapped = mapServiceDetailToListingDetail(res);
                    setData(mapped);
                }

                if (type === "product") {
                    // call product API
                }
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, type]);

    return { data, loading, error };
}
