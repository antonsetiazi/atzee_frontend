// src/core/accounting/account.api.ts

import { httpPost } from "@/core/http/http.client";

export type AccountOption = {
    value: string;
    label: string;
};

export async function fetchAccountOptions(search?: string) {
    return httpPost<{
        items: AccountOption[];
    }>("/entities/accounting/accounting.accounts.select.list/query/", {
        query: {
            search,
        },
    });
}
