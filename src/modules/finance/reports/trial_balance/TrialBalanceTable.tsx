// src/modules/finance/reports/trial_balance/TrialBalanceTable.tsx

import { formatValue } from "@/shared/utils/formatValue";
import type { TrialBalanceItem } from "./trialBalance.types";

type Props = {
    items: TrialBalanceItem[];
};

export default function TrialBalanceTable({ items }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)] text-[var(--text-secondary)]">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">Code</th>
                        <th className="px-4 py-3 text-left font-semibold">Account</th>
                        <th className="px-4 py-3 text-right font-semibold">Debit</th>
                        <th className="px-4 py-3 text-right font-semibold">Credit</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.account_id}
                            className="border-t border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-alt)]"
                        >
                            <td className="px-4 py-3 font-mono text-xs">{item.account_code}</td>
                            <td className="px-4 py-3">{item.account_name}</td>
                            <td className="px-4 py-3 text-right tabular-nums">
                                {formatValue(item.debit, {
                                    format: "number",
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums">
                                {formatValue(item.credit, {
                                    format: "number",
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
