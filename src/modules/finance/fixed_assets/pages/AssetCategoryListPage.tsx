// src/modules/finance/fixed_assets/pages/AssetCategoryListPage.tsx

import { useAssetCategories } from "../hooks/useAssetCategories";
import { Button, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { httpDelete } from "@/core/http/http.client";

export default function AssetCategoryListPage() {
    const { items, loading, reload } = useAssetCategories();

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
                right={
                    <Button
                        onClick={() => SmartNavigate.go("/finance/fixed-assets/categories/create")}
                    >
                        + Create Category
                    </Button>
                }
            />

            <div className="p-4">
                {loading ? (
                    <div className="p-6 text-sm" style={{ color: "var(--text-secondary)" }}>
                        Loading categories...
                    </div>
                ) : (
                    <div
                        className="overflow-hidden rounded-2xl border shadow-sm"
                        style={{
                            borderColor: "var(--color-border)",
                            backgroundColor: "var(--color-surface)",
                        }}
                    >
                        <table className="w-full text-sm">
                            <thead
                                style={{
                                    backgroundColor: "var(--color-surface-alt)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <tr>
                                    <th className="p-4 text-left font-medium">Code</th>
                                    <th className="p-4 text-left font-medium">Name</th>
                                    <th className="p-4 text-left font-medium">Useful Life</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="cursor-pointer transition"
                                        style={{
                                            borderTop: "1px solid var(--color-border)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                "var(--color-surface-alt)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        <td className="p-4 font-medium">{item.code}</td>

                                        <td className="p-4">
                                            <div className="font-medium">{item.name}</div>
                                            <div
                                                className="text-xs"
                                                style={{
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                Click to view details
                                            </div>
                                        </td>

                                        <td className="p-4">{item.useful_life_months} months</td>
                                        <td className="space-x-2 p-4 text-center">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    handleEdit(item.id);
                                                }}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="ghostDanger"
                                                size="sm"
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
