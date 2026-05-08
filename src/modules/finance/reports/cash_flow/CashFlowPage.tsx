// src/modules/finance/reports/cash_flow/CashFlowPage.tsx

import { useEffect, useState } from "react";

import { fetchCashFlow } from "./cashFlow.api";

import type { CashFlowResponse } from "./cashFlow.types";

import SummaryCard from "./components/SummaryCard";
import NetCashCard from "./components/NetCashCard";
import CashFlowSection from "./components/CashFlowSection";
import { HeaderPage } from "@/core/ui/components";

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

    if (loading) {
        return <div className="p-6">Loading cash flow...</div>;
    }

    return (
        <>
            <HeaderPage
                title="Cash Flow Statement"
                subtitle="Financial Report"
            />
            <div className="p-6 space-y-6">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <SummaryCard
                        title="Operating"
                        value={data.total_operating}
                    />

                    <SummaryCard
                        title="Investing"
                        value={data.total_investing}
                    />

                    <SummaryCard
                        title="Financing"
                        value={data.total_financing}
                    />
                </div>

                <NetCashCard value={data.net_cash_flow} />

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
