// src/modules/finance/receivables/payments/pages/PaymentListPage.tsx

import { useEffect, useState } from "react";
import { getReceivablePayments } from "../services/payment.service";
import type { ReceivablePayment } from "../types/payment.types";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";
import { DataTable, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";

export default function PaymentListPage() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<ReceivablePayment[]>([]);
    const table = useDataTable();

    const filteredRows = rows.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.payment_number?.toLowerCase().includes(keyword) ||
            row.customer_name?.toLowerCase().includes(keyword)
        );
    });

    async function loadData() {
        try {
            setLoading(true);
            const data = await getReceivablePayments();
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
                title="Receivable Payments"
                subtitle="Manage customer cash inflows and allocations"
                actions={[
                    {
                        label: "+ Receive Payment",
                        href: "/finance/receivables/payments/create",
                    },
                ]}
            />
            <div className="space-y-4 p-4">
                <DataTable
                    searchable
                    searchValue={table.search}
                    onSearchChange={table.setSearch}
                    loading={loading}
                    data={filteredRows}
                    onRowClick={(row) =>
                        SmartNavigate.go(`/finance/receivables/payments/${row.id}`)
                    }
                    columns={[
                        {
                            key: "payment_number",
                            title: "Payment No.",
                            render: (row) => (
                                <span className="font-semibold">{row.payment_number}</span>
                            ),
                        },
                        {
                            key: "customer_name",
                            title: "Customer",
                        },
                        {
                            key: "allocations",
                            title: "Invoice(s)",
                            render: (row) => (
                                <span className="text-xs text-[var(--text-muted)]">
                                    {row.allocations?.length
                                        ? row.allocations.map((a) => a.invoice_number).join(", ")
                                        : "-"}
                                </span>
                            ),
                        },
                        {
                            key: "payment_date",
                            title: "Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.payment_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "amount",
                            title: "Amount",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.amount, {
                                        format: "currency",
                                        currency: DEFAULT_CURRENCY,
                                        locale: DEFAULT_LOCALE,
                                    })}
                                </span>
                            ),
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
