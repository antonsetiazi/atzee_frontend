// src/modules/finance/fixed_assets/components/tables/AssetDisposalTable.tsx

import type { AssetDisposal } from "../../types/disposal.types";

type Props = {
    items: AssetDisposal[];
};

export default function AssetDisposalTable({ items }: Props) {
    return (
        <div
            className="overflow-x-auto rounded-2xl border"
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
                        <Th>Disposal Date</Th>
                        <Th>Type</Th>
                        <Th align="right">Selling Price</Th>
                        <Th align="right">Gain/Loss</Th>
                        <Th>Status</Th>
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
                            <Td>{item.disposal_date}</Td>
                            <Td>{item.disposal_type}</Td>
                            <Td align="right">{formatCurrency(item.selling_price)}</Td>
                            <Td align="right">{formatCurrency(item.gain_loss_amount)}</Td>
                            <Td>{item.status}</Td>
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
