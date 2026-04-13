// src/modules/withdrawal/services/withdraw.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet, httpPost } from "@/core/http/http.client";
import type { Withdrawal } from "../types/withdraw.types";

export async function createWithdrawal(data: {
    amount: number;
    destination: any;
}): Promise<Withdrawal> {
    return httpPost<Withdrawal>("/withdrawals/create/", data);
}

export async function getWithdrawals(): Promise<Withdrawal[]> {
    return httpGet<Withdrawal[]>("/withdrawals/");
}
