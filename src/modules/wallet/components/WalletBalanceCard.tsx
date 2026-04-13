// src/modules/wallet/components/WalletBalanceCard.tsx

import { formatValue } from "@/shared/utils/formatValue";
import type { WalletSummary } from "../types/wallet.types";

export default function WalletBalanceCard({
    summary,
}: {
    summary: WalletSummary;
}) {
    return (
        <div
            className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl"
            style={{
                background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            }}
        >
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

            <div className="relative space-y-3">
                <div className="text-sm opacity-80">Saldo Wallet</div>

                <div className="text-3xl font-bold tracking-tight">
                    {formatValue(summary.available_balance, {
                        format: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    })}
                </div>

                <div className="text-xs opacity-80">
                    Ditahan:{" "}
                    {formatValue(summary.held_balance, {
                        format: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    })}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                    <button className="px-3 py-2 text-sm rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 transition">
                        Topup
                    </button>
                    <button className="px-3 py-2 text-sm rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 transition">
                        Tarik Dana
                    </button>
                </div>
            </div>
        </div>
    );
}
