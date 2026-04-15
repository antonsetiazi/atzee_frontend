// src/modules/withdrawal/services/withdraw.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type { Withdrawal } from "../types/withdraw.types";

export async function createWithdrawal(data: {
    amount: number;
    destination_bank_id: string;
}): Promise<Withdrawal> {
    return httpPost<Withdrawal>("/withdrawals/create/", data);
}

export async function getWithdrawals(): Promise<Withdrawal[]> {
    return httpGet<Withdrawal[]>("/withdrawals/");
}
