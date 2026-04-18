// src/modules/account/bank/api/master-bank.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet } from "@/core/http/http.client";

export async function getMasterBanks() {
    return httpGet<any[]>("/banks/");
}
