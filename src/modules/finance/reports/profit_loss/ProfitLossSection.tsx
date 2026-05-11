// src/modules/finance/reports/profit_loss/ProfitLossSection.tsx

import { formatValue } from "@/shared/utils/formatValue";
import type { ProfitLossItem } from "./profitLoss.types";

type Props = {
    title: string;
    items: ProfitLossItem[];
    total: number;
};

export default function ProfitLossSection({ title, items, total }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            {/* HEADER */}
            <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
            </div>

            {/* ITEMS */}
            <div>
                {items.map((item) => (
                    <div
                        key={`${title}-${item.account_code}`}
                        className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3 last:border-b-0"
                    >
                        <div>
                            <p className="font-medium">{item.account_name}</p>

                            <p className="font-mono text-xs text-[var(--text-secondary)]">
                                {item.account_code}
                            </p>
                        </div>

                        <div className="font-semibold tabular-nums">
                            {formatValue(item.amount, {
                                format: "number",
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* TOTAL */}
            <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-4 font-bold">
                <span>Total {title}</span>

                <span className="tabular-nums">
                    {formatValue(total, {
                        format: "number",
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}
                </span>
            </div>
        </div>
    );
}
