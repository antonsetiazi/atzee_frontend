// src/modules/finance/payables/payments/pages/PayablePaymentListPage.tsx

import { useCallback, useEffect, useState } from "react";
import { formatValue } from "@/shared/utils/formatValue";
import type { PayablePayment } from "../types/payment.types";
import { getPayablePayments } from "../services/payment.service";
import { DataTable, HeaderPage } from "@/core/ui/components";
import { Plus } from "lucide-react";
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

export default function PayablePaymentListPage() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<PayablePayment[]>([]);
    const table = useDataTable();

    const filteredRows = rows.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.payment_number?.toLowerCase().includes(keyword) ||
            row.partner_name?.toLowerCase().includes(keyword)
        );
    });

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPayablePayments();
            setRows(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <>
            <HeaderPage
                title="Vendor Payments"
                subtitle="Manage supplier payments and allocations"
                actions={[
                    {
                        label: "Create Payment",
                        icon: Plus,
                        href: "/finance/payables/payments/create",
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
                    onRowClick={(row) => SmartNavigate.go(`/finance/payables/payments/${row.id}`)}
                    columns={[
                        {
                            key: "payment_number",
                            title: "Reference",
                            render: (row) => (
                                <span className="font-semibold">{row.payment_number}</span>
                            ),
                        },
                        {
                            key: "partner_name",
                            title: "Vendor",
                        },
                        {
                            key: "payment_date",
                            title: "Payment Date",
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
