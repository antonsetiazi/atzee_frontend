// src/modules/finance/reports/trial_balance/TrialBalancePage.tsx

import { useEffect, useState } from "react";
import { fetchTrialBalance } from "./trialBalance.api";
import type { TrialBalanceResponse } from "./trialBalance.types";
import TrialBalanceTable from "./TrialBalanceTable";
import { Badge, HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";

export default function TrialBalancePage() {
    const [data, setData] = useState<TrialBalanceResponse | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrialBalance()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingState />;

    if (!data) {
        return <div className="p-6">Failed to load trial balance</div>;
    }

    return (
        <>
            <HeaderPage
                title="Trial Balance"
                subtitle="Ringkasan saldo seluruh akun"
                meta={
                    <Badge color={data.is_balanced ? "success" : "error"}>
                        {data.is_balanced ? "Balanced" : "Unbalanced"}
                    </Badge>
                }
            />
            <div className="space-y-6 p-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SummaryCard
                        title="Total Debit"
                        value={formatValue(data.total_debit, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Total Credit"
                        value={formatValue(data.total_credit, {
                            format: "currency",
                        })}
                    />
                </div>

                {/* TABLE */}
                <TrialBalanceTable items={data.items} />
            </div>
        </>
    );
}
