// src/modules/finance/fixed_assets/pages/AssetDisposalPage.tsx

import AssetDisposalTable from "../components/tables/AssetDisposalTable";

import { useAssetDisposals } from "../hooks/useAssetDisposals";
import { HeaderPage } from "@/core/ui/components";

export default function AssetDisposalPage() {
    const { items, loading } = useAssetDisposals();

    return (
        <>
            <HeaderPage
                title="Asset Disposal"
                subtitle="Manage disposal history of fixed assets."
            />

            <div className="p-4">
                {loading ? <div>Loading...</div> : <AssetDisposalTable items={items} />}
            </div>
        </>
    );
}
