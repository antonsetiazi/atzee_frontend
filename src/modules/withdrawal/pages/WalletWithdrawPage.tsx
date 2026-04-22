// src/modules/withdrawal/pages/WalletWithdrawPage.tsx

import { HeaderPage, PageSkeleton } from "@/core/ui/components";
import WithdrawForm from "../components/WithdrawForm";
import WithdrawHistoryList from "../components/WithdrawHistoryList";
import { useWithdraw } from "../hooks/useWithdraw";

export default function WalletWithdrawPage() {
    const { data, loading, refetch } = useWithdraw();

    if (loading) return <PageSkeleton />;

    return (
        <>
            <HeaderPage
                title="Tarik Saldo"
                subtitle="Tarik dana ke rekening Anda dengan mudah"
            />
            <div
                className="p-5 space-y-6"
                style={{
                    background: "var(--color-background)",
                }}
            >
                {/* FORM */}
                <WithdrawForm onSuccess={refetch} />

                {/* HISTORY */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Riwayat Penarikan</h3>

                    {data.length === 0 ? (
                        <div className="text-sm text-gray-400">
                            Belum ada penarikan
                        </div>
                    ) : (
                        <WithdrawHistoryList data={data} />
                    )}
                </div>
            </div>
        </>
    );
}
