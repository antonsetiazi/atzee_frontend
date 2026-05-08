// src/modules/finance/reports/trial_balance/TrialBalanceTable.tsx

import type { TrialBalanceItem } from "./trialBalance.types";
import { formatCurrency } from "./trialBalance.utils";

type Props = {
    items: TrialBalanceItem[];
};

export default function TrialBalanceTable({ items }: Props) {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                shadow-sm
                bg-[var(--color-surface)]
                border-[var(--color-border)]
            "
        >
            <table className="w-full text-sm">
                <thead
                    className="
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-secondary)]
                    "
                >
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                            Code
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                            Account
                        </th>

                        <th className="px-4 py-3 text-right font-semibold">
                            Debit
                        </th>

                        <th className="px-4 py-3 text-right font-semibold">
                            Credit
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.account_id}
                            className="
                                border-t
                                border-[var(--color-border)]
                                hover:bg-[var(--color-surface-alt)]
                                transition-colors
                            "
                        >
                            <td className="px-4 py-3 font-mono text-xs">
                                {item.account_code}
                            </td>

                            <td className="px-4 py-3">{item.account_name}</td>

                            <td className="px-4 py-3 text-right tabular-nums">
                                {formatCurrency(item.debit)}
                            </td>

                            <td className="px-4 py-3 text-right tabular-nums">
                                {formatCurrency(item.credit)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
