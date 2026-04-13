// src/modules/wallet/services/wallet.service.ts

import { httpGet } from "@/core/http/http.client";
import type { WalletSummary, WalletTransaction } from "../types/wallet.types";

export const walletService = {
    getSummary(): Promise<WalletSummary> {
        return httpGet<WalletSummary>("/wallet/");
    },

    getTransactions(): Promise<WalletTransaction[]> {
        return httpGet<WalletTransaction[]>("/wallet/transactions/");
    },
};
