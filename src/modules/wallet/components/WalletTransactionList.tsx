// src/modules/wallet/components/WalletTransactionList.tsx

import type { WalletTransaction } from "../types/wallet.types";
import WalletTransactionItem from "./WalletTransactionItem";

export default function WalletTransactionList({
    transactions,
}: {
    transactions: WalletTransaction[];
}) {
    if (!transactions.length) {
        return (
            <div className="p-5 text-center text-gray-500">
                Belum ada transaksi
            </div>
        );
    }

    return (
        <div
            className="
                rounded-2xl 
                border border-[var(--color-border)] 
                bg-white shadow-sm overflow-hidden
            "
        >
            {transactions.map((tx) => (
                <WalletTransactionItem key={tx.id} tx={tx} />
            ))}
        </div>
    );
}
