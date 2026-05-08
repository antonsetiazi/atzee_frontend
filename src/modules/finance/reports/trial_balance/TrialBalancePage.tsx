// src/modules/finance/reports/trial_balance/TrialBalancePage.tsx

import { useEffect, useState } from "react";

import { fetchTrialBalance } from "./trialBalance.api";

import type { TrialBalanceResponse } from "./trialBalance.types";

import TrialBalanceTable from "./TrialBalanceTable";

import { formatCurrency } from "./trialBalance.utils";
import { HeaderPage } from "@/core/ui/components";

export default function TrialBalancePage() {
    const [data, setData] = useState<TrialBalanceResponse | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrialBalance()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data) {
        return <div className="p-6">Failed to load trial balance</div>;
    }

    return (
        <>
            <HeaderPage
                title="Trial Balance"
                subtitle="Ringkasan saldo seluruh akun"
            />
            <div className="p-6 space-y-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Total Debit
                        </p>

                        <h2
                            className="
                            mt-2
                            text-2xl
                            font-bold
                            tabular-nums
                        "
                        >
                            {formatCurrency(data.total_debit)}
                        </h2>
                    </div>

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
                            Total Credit
                        </p>

                        <h2
                            className="
                            mt-2
                            text-2xl
                            font-bold
                            tabular-nums
                        "
                        >
                            {formatCurrency(data.total_credit)}
                        </h2>
                    </div>
                </div>

                {/* TABLE */}
                <TrialBalanceTable items={data.items} />
                <div
                    className={`
                        px-4 py-2 rounded-xl text-sm font-medium text-center
                        ${
                            data.is_balanced
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {data.is_balanced ? "Balanced" : "Unbalanced"}
                </div>
            </div>
        </>
    );
}
