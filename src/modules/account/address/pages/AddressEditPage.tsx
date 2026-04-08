// src/modules/account/address/pages/AddressEditPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import { useAddressActions } from "../hooks/useAddressActions";
import { fetchAddress } from "../api/address.api";
import type { Address } from "../types/address.types";
import { HeaderPage } from "@/core/ui/components";

export default function AddressEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateAddress, loading } = useAddressActions();
    const [address, setAddress] = useState<Address | null>(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        async function loadAddress() {
            try {
                const data = await fetchAddress(id!); // ✅ pakai http client
                setAddress(data);
            } finally {
                setPageLoading(false);
            }
        }
        loadAddress();
    }, [id]);

    async function handleSubmit(data: Address) {
        await updateAddress(id!, data);
        navigate("/account/address");
    }

    return (
        <>
            <HeaderPage
                title="Edit Alamat"
                subtitle="Perbarui informasi alamat Anda"
            />
            <div className="space-y-6">
                {/* 🔥 LOADING STATE */}
                {pageLoading ? (
                    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-1/3" />
                        <div className="h-10 bg-gray-200 rounded-xl" />
                        <div className="h-10 bg-gray-200 rounded-xl" />
                        <div className="h-10 bg-gray-200 rounded-xl" />
                        <div className="h-24 bg-gray-200 rounded-xl" />
                        <div className="h-40 bg-gray-200 rounded-xl" />
                    </div>
                ) : (
                    <div className="p-6">
                        <AddressForm
                            initial={address!}
                            onSubmit={handleSubmit}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
