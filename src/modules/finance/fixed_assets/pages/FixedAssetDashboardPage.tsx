// src/modules/finance/fixed_assets/pages/FixedAssetDashboardPage.tsx

import AssetMetricCard from "../components/cards/AssetMetricCard";
import { useFixedAssetDashboard } from "../hooks/useFixedAssetDashboard";
import { HeaderPage } from "@/core/ui/components";

import DepreciationTrendChart from "../components/dashboard/DepreciationTrendChart";
import AssetCategoryChart from "../components/dashboard/AssetCategoryChart";

import AssetLifecyclePanel from "../components/dashboard/AssetLifecyclePanel";
import { useFixedAssets } from "../hooks/useFixedAssets";
import AssetAgingHeatmap from "../components/dashboard/AssetAgingHeatmap";

export default function FixedAssetDashboardPage() {
    const { summary, categories, monthlyDepreciation, loading } = useFixedAssetDashboard();
    const { items: assets } = useFixedAssets();
    return (
        <>
            <HeaderPage
                title="Fixed Asset Dashboard"
                subtitle="Monitor company assets, depreciation, and asset lifecycle."
                actions={[
                    {
                        label: "Add Asset",
                        href: "/finance/fixed-assets/create",
                    },
                ]}
            />
            <div className="space-y-4 p-4">
                {loading && <div>Loading...</div>}

                {summary && (
                    <>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            <AssetMetricCard
                                label="Total Assets"
                                value={String(summary.total_assets)}
                            />

                            <AssetMetricCard
                                label="Active Assets"
                                value={String(summary.active_assets)}
                            />

                            <AssetMetricCard
                                label="Total Acquisition"
                                value={new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0,
                                }).format(summary.total_acquisition_value)}
                            />

                            <AssetMetricCard
                                label="Current Book Value"
                                value={new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0,
                                }).format(summary.total_book_value)}
                            />
                        </div>
                    </>
                )}

                {/* CHARTS */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <DepreciationTrendChart data={monthlyDepreciation} />
                    <AssetCategoryChart data={categories} />
                </div>

                <AssetLifecyclePanel assets={assets} />

                <AssetAgingHeatmap assets={assets} categories={categories} />
            </div>
        </>
    );
}
