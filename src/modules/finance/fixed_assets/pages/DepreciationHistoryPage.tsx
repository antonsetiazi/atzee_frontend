// src/modules/finance/fixed_assets/pages/DepreciationHistoryPage.tsx

import DepreciationHistoryTable from "../components/tables/DepreciationHistoryTable";

import { useDepreciationHistory } from "../hooks/useDepreciationHistory";
import { HeaderPage } from "@/core/ui/components";

export default function DepreciationHistoryPage() {
    const { items, loading } = useDepreciationHistory();

    return (
        <>
            <HeaderPage
                title="Depreciation History"
                subtitle="View all asset depreciation records."
            />

            <div className="p-4">
                {loading ? <div>Loading...</div> : <DepreciationHistoryTable items={items} />}
            </div>
        </>
    );
}
