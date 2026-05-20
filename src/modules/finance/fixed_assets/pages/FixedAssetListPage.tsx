// src/modules/finance/fixed_assets/pages/FixedAssetListPage.tsx

import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";
import { useFixedAssets } from "../hooks/useFixedAssets";
import { DataTable, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { formatValue } from "@/shared/utils/formatValue";
import FixedAssetStatusBadge from "../components/badges/FixedAssetStatusBadge";

export default function FixedAssetListPage() {
    const { items, loading } = useFixedAssets();
    const table = useDataTable();

    const filteredRows = items.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.asset_number?.toLowerCase().includes(keyword) ||
            row.name?.toLowerCase().includes(keyword)
        );
    });

    return (
        <>
            <HeaderPage
                title="Fixed Assets"
                subtitle="Manage all company fixed assets."
                actions={[
                    {
                        label: "Add Asset",
                        href: "/finance/fixed-assets/create",
                    },
                ]}
            />
            <div className="p-4">
                <DataTable
                    searchable
                    searchValue={table.search}
                    onSearchChange={table.setSearch}
                    loading={loading}
                    data={filteredRows}
                    onRowClick={(row) => SmartNavigate.go(`/finance/fixed-assets/${row.id}`)}
                    columns={[
                        {
                            key: "asset_number",
                            title: "Asset Number",
                            render: (row) => (
                                <span className="font-semibold">{row.asset_number}</span>
                            ),
                        },
                        {
                            key: "name",
                            title: "Name",
                        },
                        {
                            key: "category_name",
                            title: "Category",
                        },
                        {
                            key: "purchase_cost",
                            title: "Acquisition Cost",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.purchase_cost, {
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
                        {
                            key: "status",
                            title: "Status",
                            align: "center",
                            render: (row) => <FixedAssetStatusBadge status={row.status} />,
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
