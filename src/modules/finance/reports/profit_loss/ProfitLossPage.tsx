// src/modules/finance/reports/profit_loss/ProfitLossPage.tsx

import { useEffect, useState } from "react";
import { fetchProfitLoss } from "./profitLoss.api";
import type { ProfitLossResponse } from "./profitLoss.types";
import ProfitLossSection from "./ProfitLossSection";
import { HeaderPage, SummaryCard } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";

export default function ProfitLossPage() {
    const [data, setData] = useState<ProfitLossResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfitLoss()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data) {
        return <div className="p-6">Failed to load profit & loss</div>;
    }

    const isProfit = data.net_profit >= 0;

    return (
        <>
            <HeaderPage
                title="Profit & Loss"
                subtitle="Ringkasan pendapatan dan beban perusahaan"
                right={
                    <div
                        className={`rounded-xl px-4 py-2 text-center text-sm font-semibold ${
                            isProfit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        } `}
                    >
                        {isProfit ? "PROFIT" : "LOSS"}
                    </div>
                }
            />
            <div className="space-y-6 p-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* REVENUE */}
                    <SummaryCard
                        title="Total Revenue"
                        value={formatValue(data.total_revenue, {
                            format: "currency",
                        })}
                    />

                    {/* EXPENSE */}
                    <SummaryCard
                        title="Total Expense"
                        value={formatValue(data.total_expense, {
                            format: "currency",
                        })}
                    />

                    {/* NET PROFIT */}
                    <SummaryCard
                        title="Net Profit"
                        value={formatValue(data.net_profit, {
                            format: "currency",
                        })}
                        tone={isProfit ? "success" : "danger"}
                    />
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <ProfitLossSection
                        title="Revenue"
                        items={data.revenues}
                        total={data.total_revenue}
                    />

                    <ProfitLossSection
                        title="Expenses"
                        items={data.expenses}
                        total={data.total_expense}
                    />
                </div>
            </div>
        </>
    );
}
