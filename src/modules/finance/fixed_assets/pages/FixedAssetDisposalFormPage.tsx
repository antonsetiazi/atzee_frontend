// src/modules/finance/fixed_assets/pages/FixedAssetDisposalFormPage.tsx

import { useNavigate, useParams } from "react-router-dom";
import { HeaderPage } from "@/core/ui/components";
import AssetDisposalForm from "../components/forms/AssetDisposalForm";
import { useCreateAssetDisposal } from "../hooks/useCreateAssetDisposal";
import type { AssetDisposalFormData } from "../types/disposal.types";

export default function FixedAssetDisposalFormPage() {
    const navigate = useNavigate();
    const { assetId } = useParams();
    const { submit, loading } = useCreateAssetDisposal();

    async function handleSubmit(values: AssetDisposalFormData) {
        if (!assetId) return;

        await submit(values);
        navigate(`/finance/fixed-assets/${assetId}`);
    }

    if (!assetId) {
        return <>Asset not found</>;
    }

    return (
        <>
            <HeaderPage title="Dispose Asset" subtitle="Record asset disposal transaction." />

            <div className="p-4">
                <div
                    className="rounded-xl border p-6"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <AssetDisposalForm
                        assetId={assetId}
                        loading={loading}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
}
