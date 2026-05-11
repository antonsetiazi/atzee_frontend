// src/modules/finance/fixed_assets/pages/FixedAssetDetailPage.tsx

import { useParams } from "react-router-dom";
import FixedAssetStatusBadge from "../components/badges/FixedAssetStatusBadge";
import { useFixedAssetDetail } from "../hooks/useFixedAssetDetail";
import { HeaderPage } from "@/core/ui/components";

export default function FixedAssetDetailPage() {
    const { assetId } = useParams();
    const { item, loading } = useFixedAssetDetail(assetId || "");

    if (loading) {
        return <>Loading...</>;
    }

    if (!item) {
        return <>Asset not found</>;
    }

    return (
        <>
            <HeaderPage
                title={item.name}
                subtitle={item.asset_number}
                right={<FixedAssetStatusBadge status={item.status} />}
            />

            <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2">
                <InfoCard label="Category" value={item.category_name} />
                <InfoCard label="Purchase Date" value={item.purchase_date} />
                <InfoCard label="Acquisition Cost" value={formatCurrency(item.acquisition_cost)} />
                <InfoCard label="Book Value" value={formatCurrency(item.current_book_value)} />
                <InfoCard label="Useful Life" value={`${item.useful_life_months} Months`} />
                <InfoCard label="Depreciation Method" value={item.depreciation_method} />
            </div>
        </>
    );
}

function InfoCard({ label, value }: { label: string; value?: string | number }) {
    return (
        <div
            className="rounded-2xl border p-5"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="mb-2 text-xs uppercase"
                style={{
                    color: "var(--text-muted)",
                }}
            >
                {label}
            </div>

            <div
                className="text-lg font-semibold"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {value || "-"}
            </div>
        </div>
    );
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}
