// src/modules/finance/fixed_assets/components/tables/DepreciationHistoryTable.tsx

import { formatValue } from "@/shared/utils/formatValue";
import type { DepreciationItem } from "../../types/depreciation.types";

type Props = {
    items: DepreciationItem[];
};

export default function DepreciationHistoryTable({ items }: Props) {
    return (
        <div
            className="overflow-x-auto rounded-xl border"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
            }}
        >
            <table className="w-full min-w-[900px]">
                <thead
                    style={{
                        background: "var(--color-surface-alt)",
                    }}
                >
                    <tr>
                        <Th>Asset</Th>
                        <Th>Period</Th>
                        <Th>Date</Th>
                        <Th align="right">Depreciation</Th>
                        <Th align="right">Accumulated</Th>
                        <Th align="right">Book Value</Th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t"
                            style={{
                                borderColor: "var(--color-border)",
                            }}
                        >
                            <Td>{item.asset_name}</Td>
                            <Td>
                                {formatValue(item.period, {
                                    format: "date",
                                })}
                            </Td>
                            <Td>
                                {formatValue(item.depreciation_date, {
                                    format: "date",
                                })}
                            </Td>
                            <Td align="right">{formatCurrency(item.depreciation_amount)}</Td>
                            <Td align="right">{formatCurrency(item.accumulated_depreciation)}</Td>
                            <Td align="right">{formatCurrency(item.book_value)}</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
    return (
        <th
            className="px-5 py-4 text-xs font-semibold uppercase"
            style={{
                color: "var(--text-secondary)",
                textAlign: align,
            }}
        >
            {children}
        </th>
    );
}

function Td({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
    return (
        <td
            className="px-5 py-4 text-sm"
            style={{
                color: "var(--text-secondary)",
                textAlign: align,
            }}
        >
            {children}
        </td>
    );
}
