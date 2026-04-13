// src/modules/wallet/hooks/useWallet.ts

import { useEffect, useState } from "react";
import { walletService } from "../services/wallet.service";
import type { WalletSummary, WalletTransaction } from "../types/wallet.types";

export function useWallet() {
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [summaryRes, txRes] = await Promise.all([
                    walletService.getSummary(),
                    walletService.getTransactions(),
                ]);

                setSummary(summaryRes);
                setTransactions(txRes);
            } catch (err) {
                console.error("Wallet fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return {
        summary,
        transactions,
        loading,
    };
}
