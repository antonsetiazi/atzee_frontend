// src/modules/finance/payables/invoices/pages/PayableInvoiceListPage.tsx

import { useEffect, useMemo, useState } from "react";
import { formatValue } from "@/shared/utils/formatValue";
import { getPayableInvoices } from "../services/payableInvoice.service";
import type { PayableInvoice } from "../types/payableInvoice.types";
import { DataTable, HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        draft: "bg-gray-500/10 text-gray-600",
        posted: "bg-blue-500/10 text-blue-600",
        partial: "bg-orange-500/10 text-orange-600",
        paid: "bg-green-500/10 text-green-600",
        cancelled: "bg-red-500/10 text-red-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                styles[status] || styles.draft
            }`}
        >
            {status}
        </span>
    );
}

export default function PayableInvoiceListPage() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<PayableInvoice[]>([]);
    const table = useDataTable();

    const filteredRows = rows.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.invoice_number?.toLowerCase().includes(keyword) ||
            row.partner_name?.toLowerCase().includes(keyword)
        );
    });

    async function loadData() {
        try {
            setLoading(true);

            const data = await getPayableInvoices();

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

    const summary = useMemo(() => {
        const totalPayables = rows.reduce((acc, item) => acc + Number(item.balance_due || 0), 0);

        const overdueInvoices = rows.filter((item) => {
            return item.status !== "paid" && new Date(item.due_date) < new Date();
        });

        const overdueAmount = overdueInvoices.reduce(
            (acc, item) => acc + Number(item.balance_due || 0),
            0,
        );

        const unpaidCount = rows.filter((item) => item.status !== "paid").length;

        return {
            totalPayables,
            overdueAmount,
            overdueCount: overdueInvoices.length,
            unpaidCount,
        };
    }, [rows]);

    if (loading) return <LoadingState />;

    return (
        <>
            <HeaderPage
                title="Accounts Payable"
                subtitle="Manage vendor invoices and outstanding liabilities"
                actions={[
                    {
                        label: "Create Vendor Bill",
                        href: "/finance/payables/invoices/create",
                    },
                ]}
            />
            <div className="space-y-4 p-4">
                {/* SUMMARY */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <SummaryCard
                        title="Outstanding Payables"
                        value={formatValue(summary.totalPayables, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Overdue Bills"
                        value={formatValue(summary.overdueAmount, {
                            format: "currency",
                        })}
                        subtitle={`${summary.overdueCount} overdue invoices`}
                    />
                    <SummaryCard title="Open Invoices" value={String(summary.unpaidCount)} />
                    <SummaryCard title="Total Records" value={String(rows.length)} />
                </div>

                {/* TABLE */}
                <DataTable
                    searchable
                    searchValue={table.search}
                    onSearchChange={table.setSearch}
                    loading={loading}
                    data={filteredRows}
                    onRowClick={(row) => SmartNavigate.go(`/finance/payables/invoices/${row.id}`)}
                    columns={[
                        {
                            key: "invoice_number",
                            title: "Invoice",
                            render: (row) => (
                                <span className="font-semibold">{row.invoice_number}</span>
                            ),
                        },
                        {
                            key: "partner_name",
                            title: "Vendor",
                            sortable: true,
                        },
                        {
                            key: "invoice_date",
                            title: "Invoice Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.invoice_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "due_date",
                            title: "Due Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.due_date, {
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
                            key: "balance_due",
                            title: "Balance",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.balance_due, {
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
