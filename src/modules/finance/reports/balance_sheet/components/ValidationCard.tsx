// src/modules/finance/reports/balance_sheet/components/ValidationCard.tsx

import { formatCurrency } from "../balanceSheet.utils";

type Props = {
    totalAssets: number;
    totalRightSide: number;
};

export default function ValidationCard({ totalAssets, totalRightSide }: Props) {
    const balanced = totalAssets === totalRightSide;

    return (
        <div
            className="
                rounded-3xl
                border
                p-6
                flex
                items-center
                justify-between
                flex-wrap
                gap-4
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div>
                <div
                    className="text-sm mb-1"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Balance Validation
                </div>

                <div
                    className="text-xl font-bold"
                    style={{
                        color: balanced
                            ? "var(--color-success)"
                            : "var(--color-error)",
                    }}
                >
                    {balanced ? "Balanced" : "Unbalanced"}
                </div>
            </div>

            <div className="text-right">
                <div
                    className="text-sm"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Assets
                </div>

                <div
                    className="font-bold text-lg"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {formatCurrency(totalAssets)}
                </div>
            </div>

            <div className="text-right">
                <div
                    className="text-sm"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Liabilities + Equity
                </div>

                <div
                    className="font-bold text-lg"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {formatCurrency(totalRightSide)}
                </div>
            </div>
        </div>
    );
}
