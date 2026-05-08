// src/modules/finance/reports/cash_flow/components/CashFlowSection.tsx

import type { CashFlowItem } from "../cashFlow.types";

import { formatCurrency } from "../cashFlow.utils";

type Props = {
    title: string;
    items: CashFlowItem[];
    total: number;
};

export default function CashFlowSection({ title, items, total }: Props) {
    return (
        <div
            className="
                rounded-3xl
                border
                overflow-hidden
                shadow-sm
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="px-6 py-5 border-b"
                style={{
                    borderColor: "var(--color-border)",
                }}
            >
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <table className="w-full text-sm">
                <thead
                    style={{
                        background: "var(--color-surface-alt)",
                    }}
                >
                    <tr>
                        <th className="text-left px-6 py-4">Account</th>

                        <th className="text-right px-6 py-4">Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr
                            key={`${title}-${item.account_code}`}
                            className="border-b"
                            style={{
                                borderColor: "var(--color-border)",
                            }}
                        >
                            <td className="px-6 py-4">
                                <div className="font-medium">
                                    {item.account_name}
                                </div>

                                <div
                                    className="text-xs mt-1"
                                    style={{
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {item.account_code}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-right font-semibold tabular-nums">
                                {formatCurrency(item.amount)}
                            </td>
                        </tr>
                    ))}

                    <tr
                        style={{
                            background: "var(--color-surface-alt)",
                        }}
                    >
                        <td className="px-6 py-5 font-bold">Total</td>

                        <td
                            className="
                                px-6
                                py-5
                                text-right
                                font-bold
                            "
                            style={{
                                color: "var(--color-primary)",
                            }}
                        >
                            {formatCurrency(total)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
