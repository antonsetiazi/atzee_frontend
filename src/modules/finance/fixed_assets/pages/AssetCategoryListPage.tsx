// src/modules/finance/fixed_assets/pages/AssetCategoryListPage.tsx

import { useAssetCategories } from "../hooks/useAssetCategories";
import { Button, DataTable, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { httpDelete } from "@/core/http/http.client";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";

export default function AssetCategoryListPage() {
    const { items, loading, reload } = useAssetCategories();
    const table = useDataTable();

    const filteredRows = items.filter((row) => {
        const keyword = table.search.toLowerCase();

        return (
            row.code?.toLowerCase().includes(keyword) || row.name?.toLowerCase().includes(keyword)
        );
    });

    function handleEdit(id: string) {
        SmartNavigate.go(`/finance/fixed-assets/categories/${id}/edit`);
    }

    async function handleDelete(id: string) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this asset category?",
        );

        if (!confirmDelete) return;

        await httpDelete(`/accounting/asset-categories/${id}/`);

        // refresh list after delete
        reload?.();
    }

    return (
        <>
            <HeaderPage
                title="Asset Categories"
                subtitle="Manage asset classification and depreciation configuration."
                actions={[
                    {
                        label: "Create Category",
                        href: "/finance/fixed-assets/categories/create",
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
                            key: "code",
                            title: "Code",
                            render: (row) => <span className="font-semibold">{row.code}</span>,
                        },
                        {
                            key: "name",
                            title: "Name",
                        },
                        {
                            key: "useful_life_months",
                            title: "Useful Life",
                            render: (row) => <span>{row.useful_life_months} months</span>,
                        },
                        {
                            key: "actions",
                            title: "Actions",
                            align: "center",
                            render: (row) => (
                                <div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            handleEdit(row.id);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="ghostDanger"
                                        size="sm"
                                        onClick={() => {
                                            handleDelete(row.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
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
