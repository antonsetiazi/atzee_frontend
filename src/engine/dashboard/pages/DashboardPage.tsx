// src/modules/dashboard/pages/DashboardPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import CashFlowChart from "../components/charts/CashFlowChart";
import DashboardHero from "../components/sections/DashboardHero";
import ModuleExplorer from "../components/sections/ModuleExplorer";
import QuickActionBar from "../components/sections/QuickActionBar";
import RecentInvoiceTable from "../components/tables/RecentInvoiceTable";
import ActivityTimeline from "../components/timeline/ActivityTimeline";

interface Props {
    data: any;
}

export default function DashboardPage({ data }: Props) {
    if (!data) {
        return null;
    }

    const { hero, metrics, quickActions, modules, activities, invoices, cashFlow } = data || {};

    return (
        <div
            className="p-6 lg:p-8"
            style={{
                background: `
                    linear-gradient(
                        180deg,
                        var(--color-background) 0%,
                        color-mix(in srgb, var(--color-surface) 65%, white 35%) 100%
                    )
                `,
            }}
        >
            {/* HERO */}
            <DashboardHero hero={hero} metrics={metrics} />

            {/* QUICK ACTION BAR */}
            <QuickActionBar actions={quickActions} />

            {/* MODULE EXPLORER */}
            <div className="mt-8">
                <ModuleExplorer modules={modules} />
            </div>

            {/* MAIN GRID */}
            <div className="mt-8 grid grid-cols-1 gap-6 2xl:grid-cols-[1.45fr_0.85fr]">
                {/* LEFT */}
                <div className="space-y-6">
                    <CashFlowChart items={cashFlow} />

                    <RecentInvoiceTable items={invoices} />
                </div>

                {/* RIGHT */}
                <ActivityTimeline items={activities} />
            </div>
        </div>
    );
}
