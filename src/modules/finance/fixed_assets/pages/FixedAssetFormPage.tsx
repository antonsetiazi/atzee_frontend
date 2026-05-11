// src/modules/finance/fixed_assets/pages/FixedAssetFormPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import FixedAssetForm from "../components/forms/FixedAssetForm";
import { useCreateFixedAsset } from "../hooks/useCreateFixedAsset";
import { HeaderPage } from "@/core/ui/components";

export default function FixedAssetFormPage() {
    const navigate = useNavigate();
    const { submit, loading } = useCreateFixedAsset();

    async function handleSubmit(data: any) {
        await submit(data);
        navigate("/finance/fixed-assets");
    }

    return (
        <>
            <HeaderPage title="Create Fixed Asset" subtitle="Register a new company fixed asset." />

            <div className="space-y-4 p-4">
                <FixedAssetForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
