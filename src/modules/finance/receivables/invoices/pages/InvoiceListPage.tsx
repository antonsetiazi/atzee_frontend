// src/modules/finance/receivables/invoices/pages/InvoiceListPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../services/invoice.api";
import type { ReceivableInvoice } from "../types/invoice.types";
import { formatValue } from "@/shared/utils/formatValue";
import { DataTable, HeaderPage } from "@/core/ui/components";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";
import { PlusCircle } from "lucide-react";

export default function InvoiceListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<ReceivableInvoice[]>([]);
    const table = useDataTable();

    const filteredRows = rows.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.invoice_number?.toLowerCase().includes(keyword) ||
            row.customer_name?.toLowerCase().includes(keyword)
        );
    });

    async function loadData() {
        try {
            const data = await getInvoices();
            setRows(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <HeaderPage
                title="Receivable Invoices"
                subtitle="Manage customer invoices and billing status"
                actions={[
                    {
                        label: "Create Invoice",
                        icon: PlusCircle,
                        href: "/finance/receivables/invoices/create",
                    },
                ]}
            />
            <div className="space-y-4 p-4">
                <DataTable
                    mobileVariant="card"
                    searchable
                    searchValue={table.search}
                    onSearchChange={table.setSearch}
                    loading={loading}
                    data={filteredRows}
                    onRowClick={(row) => navigate(`/finance/receivables/invoices/${row.id}`)}
                    columns={[
                        {
                            key: "invoice_number",
                            title: "Invoice",
                            render: (row) => (
                                <span className="font-semibold">{row.invoice_number}</span>
                            ),
                        },
                        {
                            key: "customer_name",
                            title: "Customer",
                            sortable: true,
                        },
                        {
                            key: "invoice_date",
                            title: "Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.invoice_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "total_amount",
                            title: "Total",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.total_amount, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "status",
                            title: "Status",
                            align: "center",
                            render: (row) => <StatusBadge status={row.status} />,
                        },
                    ]}
                    pagination={{
                        page: table.page,
                        totalPages: 1,
                        totalItems: filteredRows.length,
                        onPageChange: table.setPage,
                    }}
                />
            </div>
        </>
    );
}

/* =========================
   STATUS BADGE SYSTEM
========================= */

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; color: string }> = {
        paid: {
            bg: "rgba(34, 197, 94, 0.12)",
            color: "var(--color-success)",
        },
        partial: {
            bg: "rgba(245, 158, 11, 0.12)",
            color: "var(--color-warning)",
        },
        posted: {
            bg: "rgba(59, 130, 246, 0.12)",
            color: "var(--color-primary)",
        },
        default: {
            bg: "rgba(148, 163, 184, 0.12)",
            color: "var(--text-muted)",
        },
    };

    const style = map[status] || map.default;

    return (
        <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
                background: style.bg,
                color: style.color,
            }}
        >
            {status}
        </span>
    );
}
