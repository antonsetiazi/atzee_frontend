import type { EntityTableSchema } from "@/business/tables/types";
import EntityTable from "@/business/tables/EntityTable";

const schema = {
    entity: "product",
    columns: [
        { key: "sku", label: "SKU", sortable: true },
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
    ],
    rowActions: [
        {
            key: "edit",
            label: "Edit",
            permission: "product.edit",
        },
        {
            key: "delete",
            label: "Delete",
            permission: "product.delete",
            variant: "danger",
            confirm: true,
        },
    ],
    bulkActions: [
        {
            key: "delete",
            label: "Delete Selected",
            permission: "product.delete",
            confirm: true,
        },
    ],
} satisfies EntityTableSchema;

const data = [
    { id: "1", sku: "P001", name: "Product A", price: 1000 },
    { id: "2", sku: "P002", name: "Product B", price: 2000 },
];

export default function ProductListPage() {
    return <EntityTable schema={schema} data={data} />;
}
