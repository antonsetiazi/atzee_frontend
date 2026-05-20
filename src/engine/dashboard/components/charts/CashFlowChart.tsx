// src/modules/dashboard/components/charts/CashFlowChart.tsx

import type { CashFlowItem } from "../../types/dashboard.types";
import DashboardSectionCard from "../ui/DashboardSectionCard";

interface Props {
    items: CashFlowItem[];
}

export default function CashFlowChart({ items }: Props) {
    if (!items?.length) {
        return null;
    }

    return (
        <DashboardSectionCard
            title="Cash Flow Analytics"
            subtitle="Financial movement and liquidity overview."
        >
            <div
                className="rounded-[28px] border p-6"
                style={{
                    background: "rgba(15,23,42,0.78)",
                    borderColor: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(24px)",
                }}
            >
                <div>
                    <div className="text-lg font-semibold text-white">Cash Flow Overview</div>

                    <div className="mt-1 text-sm text-slate-400">
                        Income and operational expense movement.
                    </div>
                </div>

                <div className="mt-10 flex h-[260px] items-end gap-4">
                    {items.map((item) => (
                        <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                            <div
                                className="w-full rounded-t-3xl"
                                style={{
                                    height: item.value,
                                    background:
                                        "linear-gradient(180deg, rgba(34,211,238,0.95), rgba(59,130,246,0.55))",
                                }}
                            />

                            <div className="text-xs text-white"> {item.month}</div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardSectionCard>
    );
}
