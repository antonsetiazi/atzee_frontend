// src/modules/finance/reports/cash_flow/components/NetCashCard.tsx

import { formatCurrency } from "../cashFlow.utils";

type Props = {
    value: number;
};

export default function NetCashCard({ value }: Props) {
    const positive = value >= 0;

    return (
        <div
            className="
                rounded-3xl
                border
                p-8
            "
            style={{
                background: positive
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(239,68,68,0.08)",

                borderColor: positive
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(239,68,68,0.2)",
            }}
        >
            <div
                className="text-sm mb-2"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                Net Cash Flow
            </div>

            <div
                className="
                    text-4xl
                    font-bold
                    tracking-tight
                "
                style={{
                    color: positive
                        ? "var(--color-success)"
                        : "var(--color-error)",
                }}
            >
                {formatCurrency(value)}
            </div>
        </div>
    );
}
