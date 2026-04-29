// src/modules/account/address/pages/AddressCreatePage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HeaderPage } from "@/core/ui/components";
import AddressForm from "../components/AddressForm";
import { useAddressActions } from "../hooks/useAddressActions";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function AddressCreatePage() {
    const { createAddress, loading } = useAddressActions();

    async function handleSubmit(data: any) {
        await createAddress(data);
        SmartNavigate.back();
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
