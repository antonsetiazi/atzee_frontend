// src/modules/finance/reports/balance_sheet/components/BalanceSection.tsx

import type { BalanceItem } from "../balanceSheet.types";
import { formatCurrency } from "../balanceSheet.utils";

type Props = {
    title: string;
    items: BalanceItem[];
    total: number;
};

export default function BalanceSection({ title, items, total }: Props) {
    return (
        <div
            className="
                rounded-3xl
                border
                overflow-hidden
                backdrop-blur-xl
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
                <h2
                    className="text-lg font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {title}
                </h2>
            </div>

            <div className="overflow-auto">
                <table className="w-full text-sm">
                    <thead
                        style={{
                            background: "var(--color-surface-alt)",
                        }}
                    >
                        <tr>
                            <th className="text-left px-6 py-4">Account</th>

                            <th className="text-right px-6 py-4">Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item.account_code}
                                className="border-b hover:bg-black/5"
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
                                    {formatCurrency(item.balance)}
                                </td>
                            </tr>
                        ))}

                        <tr
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <td className="px-6 py-5 font-bold">
                                Total {title}
                            </td>

                            <td
                                className="
                                    px-6
                                    py-5
                                    text-right
                                    font-bold
                                    text-base
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
        </div>
    );
}
