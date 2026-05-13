// src/modules/finance/fixed_assets/components/tables/FixedAssetTable.tsx

import { Link } from "react-router-dom";
import FixedAssetStatusBadge from "../badges/FixedAssetStatusBadge";
import type { FixedAsset } from "../../types/fixedAsset.types";

type Props = {
    items: FixedAsset[];
};

export default function FixedAssetTable({ items }: Props) {
    return (
        <div
            className="overflow-x-auto rounded-2xl border"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
            }}
        >
            <table className="w-full min-w-[1000px]">
                <thead
                    style={{
                        background: "var(--color-surface-alt)",
                    }}
                >
                    <tr>
                        <Th>Asset Number</Th>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th align="right">Acquisition Cost</Th>
                        <Th align="right">Book Value</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
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
                            <Td>{item.asset_number}</Td>

                            <Td>
                                <div
                                    className="font-medium"
                                    style={{
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {item.name}
                                </div>
                            </Td>

                            <Td>{item.category_name || "-"}</Td>

                            <Td align="right">{formatCurrency(item.purchase_cost)}</Td>

                            <Td align="right">{formatCurrency(item.book_value)}</Td>

                            <Td>
                                <FixedAssetStatusBadge status={item.status} />
                            </Td>

                            <Td>
                                <Link
                                    to={`/finance/fixed-assets/${item.id}`}
                                    className="text-sm font-medium"
                                    style={{
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    View
                                </Link>
                            </Td>
                        </tr>
                    ))}

                    {items.length === 0 && (
                        <tr>
                            <td
                                colSpan={7}
                                className="py-10 text-center text-sm"
                                style={{
                                    color: "var(--text-muted)",
                                }}
                            >
                                No fixed assets found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// ======================================================
// HELPERS
// ======================================================

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
            className="px-5 py-4 text-xs font-semibold tracking-wide uppercase"
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
