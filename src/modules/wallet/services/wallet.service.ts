// src/modules/wallet/services/wallet.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type { WalletSummary, WalletTransaction } from "../types/wallet.types";
import type { PaymentExecution } from "@/business/payment/payment.types";

export const walletService = {
    getSummary(): Promise<WalletSummary> {
        return httpGet<WalletSummary>("/wallet/");
    },

    getTransactions(): Promise<WalletTransaction[]> {
        return httpGet<WalletTransaction[]>("/wallet/transactions/");
    },

    topup(amount: number): Promise<PaymentExecution> {
        return httpPost<PaymentExecution>("/wallet/topup/", {
            amount,
        });
    },
};
