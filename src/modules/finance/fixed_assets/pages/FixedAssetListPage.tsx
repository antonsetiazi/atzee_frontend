// src/modules/finance/fixed_assets/pages/FixedAssetListPage.tsx

import FixedAssetTable from "../components/tables/FixedAssetTable";

import { useFixedAssets } from "../hooks/useFixedAssets";
import { Button, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function FixedAssetListPage() {
    const { items, loading } = useFixedAssets();

    return (
        <>
            <HeaderPage
                title="Fixed Assets"
                subtitle="Manage all company fixed assets."
                right={
                    <Button onClick={() => SmartNavigate.go("/finance/fixed-assets/create")}>
                        Add Asset
                    </Button>
                }
            />
            <div className="p-4">
                {loading ? <div>Loading...</div> : <FixedAssetTable items={items} />}
            </div>
        </>
    );
}
