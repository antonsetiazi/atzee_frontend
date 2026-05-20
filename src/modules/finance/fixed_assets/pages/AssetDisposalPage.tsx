// src/modules/finance/fixed_assets/pages/AssetDisposalPage.tsx

import { formatValue } from "@/shared/utils/formatValue";
import { useAssetDisposals } from "../hooks/useAssetDisposals";
import { DataTable, HeaderPage } from "@/core/ui/components";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";

export default function AssetDisposalPage() {
    const { items, loading } = useAssetDisposals();
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
                title="Asset Disposal"
                subtitle="Manage disposal history of fixed assets."
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
                            key: "asset_number",
                            title: "Asset Number",
                            render: (row) => (
                                <span className="font-semibold">{row.asset_number}</span>
                            ),
                        },
                        {
                            key: "asset_name",
                            title: "Asset Name",
                        },
                        {
                            key: "disposal_date",
                            title: "Disposal Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.disposal_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "disposal_value",
                            title: "Disposal Value",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.disposal_value, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "gain_loss_amount",
                            title: "Gain/Loss",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.gain_loss_amount, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "status",
                            title: "Status",
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
