// src/modules/finance/reports/cash_flow/components/SummaryCard.tsx

import { formatCurrency } from "../cashFlow.utils";

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
