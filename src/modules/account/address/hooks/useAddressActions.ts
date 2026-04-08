// src/modules/account/address/hooks/useAddressActions.ts
import { useState, useCallback } from "react";
import type { Address } from "../types/address.types";
import {
    fetchAddresses,
    createAddress as apiCreate,
    updateAddress as apiUpdate,
    deleteAddress as apiDelete,
} from "../api/address.api";

export function useAddressActions() {
    const [loading, setLoading] = useState(false);

    const getAddresses = useCallback(async () => {
        return await fetchAddresses();
    }, []);

    const createAddress = useCallback(async (data: Address) => {
        setLoading(true);
        try {
            return await apiCreate(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateAddress = useCallback(async (id: string, data: Address) => {
        setLoading(true);
        try {
            return await apiUpdate(id, data);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAddressFn = useCallback(async (id: string) => {
        setLoading(true);
        try {
            await apiDelete(id);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        getAddresses,
        createAddress,
        updateAddress,
        deleteAddress: deleteAddressFn,
    };
}
