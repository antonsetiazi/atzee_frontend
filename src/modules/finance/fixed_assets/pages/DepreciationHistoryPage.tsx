// src/modules/finance/fixed_assets/pages/DepreciationHistoryPage.tsx

import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";
import { useDepreciationHistory } from "../hooks/useDepreciationHistory";
import { DataTable, HeaderPage } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";

export default function DepreciationHistoryPage() {
    const { items, loading } = useDepreciationHistory();
    const table = useDataTable();

    const filteredRows = items.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.asset_number?.toLowerCase().includes(keyword) ||
            row.asset_name?.toLowerCase().includes(keyword)
        );
    });

    return (
        <>
            <HeaderPage
                title="Depreciation History"
                subtitle="View all asset depreciation records."
            />

            <div className="p-4">
                <DataTable
                    searchable
                    searchValue={table.search}
                    onSearchChange={table.setSearch}
                    loading={loading}
                    data={filteredRows}
                    columns={[
                        {
                            key: "asset_name",
                            title: "Asset",
                            render: (row) => (
                                <span className="font-semibold">{row.asset_name}</span>
                            ),
                        },
                        {
                            key: "period",
                            title: "Period",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.period, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "depreciation_date",
                            title: "Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.depreciation_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "depreciation_amount",
                            title: "Depreciation",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.depreciation_amount, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "accumulated_depreciation",
                            title: "Accumulated",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.accumulated_depreciation, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "book_value",
                            title: "Book Value",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.book_value, {
                                        format: "currency",
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
