/* eslint-disable @typescript-eslint/no-explicit-any */

import type { EntityAction } from "../actions/action.types";

export const productActions: EntityAction<any>[] = [
    {
        key: "view",
        label: "View",
        type: "view",
        permission: "product.view",
        execute: ({ row, navigate }) => {
            navigate(`/products/${row.id}`);
        },
    },
    {
        key: "edit",
        label: "Edit",
        type: "update",
        permission: "product.update",
        execute: ({ row, navigate }) => {
            navigate(`/products/${row.id}/edit`);
        },
    },
    {
        key: "delete",
        label: "Delete",
        type: "delete",
        permission: "product.delete",
        confirm: {
            title: "Delete Product",
            message: "Are you sure you want to delete this product?",
        },
        execute: async ({ row, refresh }) => {
            console.log("DELETE PRODUCT", row.id);
            // nanti: call API
            refresh();
        },
    },
];
