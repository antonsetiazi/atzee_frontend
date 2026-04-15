// src/module/account/bank/api/bank.api.ts

import {
    httpGet,
    httpPost,
    httpPatch,
    httpDelete,
} from "@/core/http/http.client";
import type { BankAccount, BankPayload } from "../types/bank.types";

export async function getBanks(): Promise<BankAccount[]> {
    return httpGet<BankAccount[]>("/account/banks/");
}

export async function createBank(data: BankPayload): Promise<BankAccount> {
    return httpPost<BankAccount>("/account/banks/", data);
}

export async function updateBank(
    id: string,
    data: Partial<BankPayload>,
): Promise<BankAccount> {
    return httpPatch<BankAccount>(`/account/banks/${id}/`, data);
}

export async function deleteBank(id: string): Promise<void> {
    return httpDelete(`/account/banks/${id}/`);
}
