// src/modules/finance/reports/balance_sheet/BalanceSheetPage.tsx

import { useEffect, useMemo, useState } from "react";

import { fetchBalanceSheet } from "./balanceSheet.api";
import type { BalanceSheetResponse } from "./balanceSheet.types";

import SummaryCard from "./components/SummaryCard";
import ValidationCard from "./components/ValidationCard";
import BalanceSection from "./components/BalanceSection";
import { HeaderPage } from "@/core/ui/components";

export default function BalanceSheetPage() {
    const [data, setData] = useState<BalanceSheetResponse>({
        assets: [],
        liabilities: [],
        equities: [],

        total_asset: 0,
        total_liability: 0,
        total_equity: 0,

        is_balanced: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBalanceSheet()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    const totalAssets = useMemo(() => {
        return data.assets.reduce((sum, item) => sum + Number(item.amount), 0);
    }, [data.assets]);

    const totalLiabilities = useMemo(() => {
        return data.liabilities.reduce(
            (sum, item) => sum + Number(item.amount),
            0,
        );
    }, [data.liabilities]);

    const totalEquity = useMemo(() => {
        return data.equities.reduce(
            (sum, item) => sum + Number(item.amount),
            0,
        );
    }, [data.equities]);

    const totalRightSide = totalLiabilities + totalEquity;

    if (loading) {
        return (
            <div className="p-6">
                <div
                    className="
                        rounded-3xl
                        border
                        p-10
                        animate-pulse
                    "
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    Loading balance sheet...
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderPage title="Balance Sheet" subtitle="Financial Report" />

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <SummaryCard title="Total Assets" value={totalAssets} />

                    <SummaryCard
                        title="Total Liabilities"
                        value={totalLiabilities}
                    />

                    <SummaryCard title="Total Equity" value={totalEquity} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <BalanceSection
                        title="Assets"
                        items={data.assets}
                        total={totalAssets}
                    />

                    <div className="space-y-6">
                        <BalanceSection
                            title="Liabilities"
                            items={data.liabilities}
                            total={totalLiabilities}
                        />

                        <BalanceSection
                            title="Equity"
                            items={data.equities}
                            total={totalEquity}
                        />
                    </div>
                </div>

                <ValidationCard
                    totalAssets={totalAssets}
                    totalRightSide={totalRightSide}
                />
            </div>
        </>
    );
}
