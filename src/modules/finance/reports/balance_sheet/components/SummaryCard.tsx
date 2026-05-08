// src/modules/finance/reports/balance_sheet/components/SummaryCard.tsx

import { formatCurrency } from "../balanceSheet.utils";

type Props = {
    title: string;
    value: number;
};

export default function SummaryCard({ title, value }: Props) {
    return (
        <div
            className="
                rounded-3xl
                border
                p-6
                shadow-sm
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="text-sm mb-2"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {title}
            </div>

            <div
                className="
                    text-2xl
                    font-bold
                    tracking-tight
                    tabular-nums
                "
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {formatCurrency(value)}
            </div>
        </div>
    );
}
