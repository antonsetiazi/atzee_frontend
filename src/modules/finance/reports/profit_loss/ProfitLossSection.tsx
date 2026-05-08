// src/modules/finance/reports/profit_loss/ProfitLossSection.tsx

import type { ProfitLossItem } from "./profitLoss.types";

import { formatCurrency } from "./profitLoss.utils";

type Props = {
    title: string;
    items: ProfitLossItem[];
    total: number;
};

export default function ProfitLossSection({ title, items, total }: Props) {
    return (
        <div
            className="
                rounded-2xl
                border
                shadow-sm
                overflow-hidden
                bg-[var(--color-surface)]
                border-[var(--color-border)]
            "
        >
            {/* HEADER */}
            <div
                className="
                    px-5 py-4
                    border-b
                    bg-[var(--color-surface-alt)]
                    border-[var(--color-border)]
                "
            >
                <h2
                    className="
                        text-lg
                        font-semibold
                        text-[var(--text-primary)]
                    "
                >
                    {title}
                </h2>
            </div>

            {/* ITEMS */}
            <div>
                {items.map((item) => (
                    <div
                        key={`${title}-${item.account_code}`}
                        className="
                            flex
                            items-center
                            justify-between
                            px-5 py-3
                            border-b
                            last:border-b-0
                            border-[var(--color-border)]
                        "
                    >
                        <div>
                            <p className="font-medium">{item.account_name}</p>

                            <p
                                className="
                                    text-xs
                                    text-[var(--text-secondary)]
                                    font-mono
                                "
                            >
                                {item.account_code}
                            </p>
                        </div>

                        <div
                            className="
                                font-semibold
                                tabular-nums
                            "
                        >
                            {formatCurrency(item.amount)}
                        </div>
                    </div>
                ))}
            </div>

            {/* TOTAL */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5 py-4
                    border-t
                    font-bold
                    bg-[var(--color-surface-alt)]
                    border-[var(--color-border)]
                "
            >
                <span>Total {title}</span>

                <span className="tabular-nums">{formatCurrency(total)}</span>
            </div>
        </div>
    );
}
