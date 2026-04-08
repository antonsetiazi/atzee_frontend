// src/modules/account/address/pages/AddressCreatePage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HeaderPage } from "@/core/ui/components";
import AddressForm from "../components/AddressForm";
import { useAddressActions } from "../hooks/useAddressActions";
import { useNavigate } from "react-router-dom";

export default function AddressCreatePage() {
    const { createAddress, loading } = useAddressActions();
    const navigate = useNavigate();

    async function handleSubmit(data: any) {
        await createAddress(data);
        navigate("/account/address");
    }

    return (
        <>
            <HeaderPage
                title="Tambah Alamat"
                subtitle="Tambah informasi alamat Anda"
            />
            <div className="p-4 space-y-6">
                <AddressForm onSubmit={handleSubmit} loading={loading} />
            </div>
        </>
    );
}
