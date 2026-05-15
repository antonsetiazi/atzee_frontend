// src/modules/dashboard/components/sections/MetricsGrid.tsx

import FinanceMetricCard from "../cards/FinanceMetricCard";
import type { DashboardMetric } from "../../types/dashboard.types";

interface Props {
    items: DashboardMetric[];
}

export default function MetricsGrid({ items }: Props) {
    if (!items) {
        return null;
    }

    return (
        <div className="grid grid-cols-2 gap-4 xl:w-[480px]">
            {items.map((item) => (
                <FinanceMetricCard key={item.label} item={item} />
            ))}
        </div>
    );
}
