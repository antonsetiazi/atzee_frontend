// src/modules/finance/reports/cash_flow/CashFlowPage.tsx

import { useEffect, useState } from "react";

import { fetchCashFlow } from "./cashFlow.api";

import type { CashFlowResponse } from "./cashFlow.types";
import CashFlowSection from "./components/CashFlowSection";
import { HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";

export default function CashFlowPage() {
    const [data, setData] = useState<CashFlowResponse>({
        operating: [],
        investing: [],
        financing: [],

        total_operating: 0,
        total_investing: 0,
        total_financing: 0,

        net_cash_flow: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCashFlow()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingState />;
    // console.log(data);
    return (
        <>
            <HeaderPage title="Cash Flow Statement" subtitle="Financial Report" />
            <div className="space-y-6 p-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <SummaryCard
                        title="Operating"
                        value={formatValue(data.total_operating, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Investing"
                        value={formatValue(data.total_investing, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Financing"
                        value={formatValue(data.total_financing, {
                            format: "currency",
                        })}
                    />
                </div>

                <SummaryCard
                    title="Net Cash Flow"
                    value={formatValue(data.net_cash_flow, {
                        format: "currency",
                    })}
                    tone={data.net_cash_flow >= 0 ? "success" : "danger"}
                />

                <div className="space-y-6">
                    <CashFlowSection
                        title="Operating Activities"
                        items={data.operating}
                        total={data.total_operating}
                    />

                    <CashFlowSection
                        title="Investing Activities"
                        items={data.investing}
                        total={data.total_investing}
                    />

                    <CashFlowSection
                        title="Financing Activities"
                        items={data.financing}
                        total={data.total_financing}
                    />
                </div>
            </div>
        </>
    );
}
