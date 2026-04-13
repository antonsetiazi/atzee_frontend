// src/modules/wallet/components/WalletTransactionItem.tsx

import type { WalletTransaction } from "../types/wallet.types";

function getLabel(type: string) {
    switch (type) {
        case "topup":
            return "Pembayaran berhasil";
        case "escrow_hold":
            return "Menunggu layanan selesai";
        case "escrow_release":
            return "Dana diteruskan ke ustadz";
        case "refund":
            return "Dana dikembalikan";
        default:
            return type;
    }
}

function getIcon(type: string) {
    switch (type) {
        case "topup":
            return "💰";
        case "escrow_hold":
            return "⏳";
        case "escrow_release":
            return "✅";
        case "refund":
            return "↩️";
        default:
            return "📄";
    }
}

export default function WalletTransactionItem({
    tx,
}: {
    tx: WalletTransaction;
}) {
    const isPositive = tx.amount > 0;

    return (
        <div className="flex items-center justify-between p-4 hover:bg-[var(--color-surface-alt)] transition">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center text-sm">
                    {getIcon(tx.transaction_type)}
                </div>

                <div>
                    <div className="font-medium text-[var(--text-primary)]">
                        {getLabel(tx.transaction_type)}
                    </div>

                    <div className="text-xs text-[var(--text-muted)]">
                        {new Date(tx.created_at).toLocaleString()}
                    </div>
                </div>
            </div>

            <div
                className={`font-semibold ${
                    isPositive
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-error)]"
                }`}
            >
                {isPositive ? "+" : "-"} Rp{" "}
                {Math.abs(tx.amount).toLocaleString()}
            </div>
        </div>
    );
}
