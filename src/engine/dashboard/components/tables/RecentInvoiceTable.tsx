// src/modules/dashboard/components/tables/RecentInvoiceTable.tsx

import type { RecentInvoice } from "../../types/dashboard.types";
import DashboardSectionCard from "../ui/DashboardSectionCard";

interface Props {
    items: RecentInvoice[];
}

export default function RecentInvoiceTable({ items }: Props) {
    if (!items?.length) {
        return null;
    }

    return (
        <DashboardSectionCard title="Recent Invoices" subtitle="Latest receivable transactions.">
            <div
                className="mt-6 overflow-hidden rounded-2xl border"
                style={{
                    borderColor: "var(--color-border)",

                    background: `
                    linear-gradient(
                        180deg,
                        rgba(255,255,255,0.78),
                        rgba(255,255,255,0.62)
                    )
                `,
                }}
            >
                <table className="w-full">
                    <thead
                        style={{
                            background: "var(--color-surface-alt)",
                        }}
                    >
                        <tr>
                            <Th>Customer</Th>
                            <Th>Invoice</Th>
                            <Th>Amount</Th>
                            <Th>Status</Th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors duration-200"
                                style={{
                                    borderTop: `1px solid var(--color-border)`,
                                }}
                            >
                                <Td>{item.customer}</Td>

                                <Td>
                                    <div
                                        className="font-medium"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        {item.invoice}
                                    </div>
                                </Td>

                                <Td>
                                    <div
                                        className="font-semibold"
                                        style={{
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {item.amount}
                                    </div>
                                </Td>

                                <Td>
                                    <StatusBadge status={item.status} />
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardSectionCard>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th
            className="px-6 py-4 text-left text-xs font-semibold tracking-[0.12em] uppercase"
            style={{
                color: "var(--text-muted)",
            }}
        >
            {children}
        </th>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return (
        <td
            className="px-6 py-5 text-sm"
            style={{
                color: "var(--text-secondary)",
            }}
        >
            {children}
        </td>
    );
}

function StatusBadge({ status }: { status: RecentInvoice["status"] }) {
    const config: Record<
        string,
        {
            background: string;
            color: string;
        }
    > = {
        Paid: {
            background: "color-mix(in srgb, var(--color-success) 12%, white)",

            color: "var(--color-success)",
        },

        Pending: {
            background: "color-mix(in srgb, var(--color-warning) 12%, white)",

            color: "var(--color-warning)",
        },

        Overdue: {
            background: "color-mix(in srgb, var(--color-error) 10%, white)",

            color: "var(--color-error)",
        },
    };

    const style = config[status] || {
        background: "var(--color-surface-alt)",
        color: "var(--text-secondary)",
    };

    return (
        <div
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{
                background: style.background,
                color: style.color,
            }}
        >
            {status}
        </div>
    );
}
