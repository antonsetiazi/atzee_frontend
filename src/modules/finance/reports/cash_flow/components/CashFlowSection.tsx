// src/modules/finance/reports/cash_flow/components/CashFlowSection.tsx

import type { CashFlowItem } from "../cashFlow.types";
import { formatValue } from "@/shared/utils/formatValue";

type Props = {
    title: string;
    items: CashFlowItem[];
    total: number;
};

export default function CashFlowSection({ title, items, total }: Props) {
    return (
        <div
            className="overflow-hidden rounded-3xl border shadow-sm"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="border-b px-6 py-5"
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
                        <th className="px-6 py-4 text-left">Account</th>

                        <th className="px-6 py-4 text-right">Amount</th>
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
                                <div className="font-medium">{item.account_name}</div>

                                <div
                                    className="mt-1 text-xs"
                                    style={{
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {item.account_code}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-right font-semibold tabular-nums">
                                {formatValue(item.amount, {
                                    format: "currency",
                                })}
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
                            className="px-6 py-5 text-right font-bold"
                            style={{
                                color: "var(--color-primary)",
                            }}
                        >
                            {formatValue(total, {
                                format: "currency",
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
