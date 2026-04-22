// src/modules/wallet/pages/WalletPage.tsx

import { useWallet } from "../hooks/useWallet";
import WalletBalanceCard from "../components/WalletBalanceCard";
import WalletTransactionList from "../components/WalletTransactionList";
import { HeaderPage, PageSkeleton } from "@/core/ui/components";

export default function WalletPage() {
    const { summary, transactions, loading } = useWallet();

    if (loading) return <PageSkeleton />;

    if (!summary) {
        return <div className="p-5">Gagal memuat wallet</div>;
    }

    return (
        <>
            <HeaderPage title="Wallet" />
            <div className="space-y-4 p-4">
                <WalletBalanceCard summary={summary} />

                <div className="px-1">
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                        Riwayat Transaksi
                    </h3>

                    <WalletTransactionList transactions={transactions} />
                </div>
            </div>
        </>
    );
}
