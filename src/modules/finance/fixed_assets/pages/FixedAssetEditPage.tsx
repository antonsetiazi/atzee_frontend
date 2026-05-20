// src/modules/finance/fixed_assets/pages/FixedAssetEditPage.tsx

import { useNavigate, useParams } from "react-router-dom";
import { HeaderPage, LoadingState } from "@/core/ui/components";
import FixedAssetForm from "../components/forms/FixedAssetForm";
import { useFixedAssetDetail } from "../hooks/useFixedAssetDetail";
import { useUpdateFixedAsset } from "../hooks/useUpdateFixedAsset";
import type { FixedAssetFormData } from "../types/fixedAsset.types";

export default function FixedAssetEditPage() {
    const navigate = useNavigate();
    const { assetId } = useParams();
    const { item, loading } = useFixedAssetDetail(assetId || "");
    const { submit, loading: saving } = useUpdateFixedAsset();

    async function handleSubmit(data: FixedAssetFormData) {
        if (!assetId) {
            return;
        }

        await submit(assetId, data);
        navigate(`/finance/fixed-assets/${assetId}`);
    }

    if (loading) return <LoadingState />;

    if (!item) {
        return <>Asset not found</>;
    }

    return (
        <>
            <HeaderPage title="Edit Fixed Asset" subtitle={item.asset_number} />

            <div className="p-4">
                <FixedAssetForm initialValues={item} loading={saving} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
