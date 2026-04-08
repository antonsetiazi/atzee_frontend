// src/modules/account/address/hooks/useAddresses.ts

import { useState, useCallback } from "react";
import type { Address } from "../types/address.types";
import { httpGet } from "@/core/http/http.client";

export function useAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);

    const loadAddresses = useCallback(async () => {
        setLoading(true);
        try {
            const data = await httpGet<Address[]>("/api/account/address/");
            setAddresses(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const getAddress = useCallback(async (id: string) => {
        setLoading(true);
        try {
            return await httpGet<Address>(`/api/account/address/${id}/`);
        } finally {
            setLoading(false);
        }
    }, []);

    return { addresses, loading, loadAddresses, getAddress };
}
