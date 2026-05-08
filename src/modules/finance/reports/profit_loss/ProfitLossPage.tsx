// src/modules/finance/reports/profit_loss/ProfitLossPage.tsx

import { useEffect, useState } from "react";

import { fetchProfitLoss } from "./profitLoss.api";

import type { ProfitLossResponse } from "./profitLoss.types";

import ProfitLossSection from "./ProfitLossSection";

import { formatCurrency } from "./profitLoss.utils";
import { HeaderPage } from "@/core/ui/components";

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
            />
            <div className="p-6 space-y-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* REVENUE */}
                    <div
                        className="
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        bg-[var(--color-surface)]
                        border-[var(--color-border)]
                    "
                    >
                        <p
                            className="
                            text-sm
                            text-[var(--text-secondary)]
                        "
                        >
                            Total Revenue
                        </p>

                        <h2
                            className="
                            mt-2
                            text-2xl
                            font-bold
                            tabular-nums
                        "
                        >
                            {formatCurrency(data.total_revenue)}
                        </h2>
                    </div>

                    {/* EXPENSE */}
                    <div
                        className="
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        bg-[var(--color-surface)]
                        border-[var(--color-border)]
                    "
                    >
                        <p
                            className="
                            text-sm
                            text-[var(--text-secondary)]
                        "
                        >
                            Total Expense
                        </p>

                        <h2
                            className="
                            mt-2
                            text-2xl
                            font-bold
                            tabular-nums
                        "
                        >
                            {formatCurrency(data.total_expense)}
                        </h2>
                    </div>

                    {/* NET PROFIT */}
                    <div
                        className={`
                        rounded-2xl
                        border
                        p-5
                        shadow-sm
                        ${
                            isProfit
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                        }
                    `}
                    >
                        <p
                            className={`
                            text-sm
                            ${isProfit ? "text-green-700" : "text-red-700"}
                        `}
                        >
                            Net Profit
                        </p>

                        <h2
                            className={`
                            mt-2
                            text-2xl
                            font-bold
                            tabular-nums
                            ${isProfit ? "text-green-700" : "text-red-700"}
                        `}
                        >
                            {formatCurrency(data.net_profit)}
                        </h2>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

                <div
                    className={`
                        px-4 py-2 rounded-xl text-sm font-semibold text-center
                        ${
                            isProfit
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {isProfit ? "PROFIT" : "LOSS"}
                </div>
            </div>
        </>
    );
}
