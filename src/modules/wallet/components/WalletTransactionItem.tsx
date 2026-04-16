// src/modules/wallet/components/WalletTransactionItem.tsx

import type { WalletTransaction } from "../types/wallet.types";

function getTitle(tx: WalletTransaction) {
    const flow = tx.meta?.flow;

    switch (flow) {
        case "topup":
            return "Topup Wallet";

        case "escrow":
            return "Pembayaran Booking";

        case "payout":
            return "Pencairan Dana";

        case "refund":
            return "Refund";

        case "system":
            return "Biaya Platform";

        default:
            return "Transaksi";
    }
}

function getSubtitle(tx: WalletTransaction) {
    const meta = tx.meta;

    if (!meta) return tx.description || "-";

    // 💰 TOPUP
    if (meta.flow === "topup") {
        if (meta.channel) {
            return `via ${meta.channel.toUpperCase()}`;
        }
        return "Topup saldo";
    }

    // 📦 ORDER RELATED
    if (meta.order_id) {
        return `Order #${meta.order_id}`;
    }

    // 💸 PAYOUT
    if (meta.flow === "payout") {
        return "Dana diteruskan ke mitra";
    }

    // 🔁 REFUND
    if (meta.flow === "refund") {
        return "Pengembalian dana";
    }

    return tx.description || "-";
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
        <div className="flex items-center justify-between px-4 py-3 hover:bg-[var(--color-surface-alt)] transition rounded-xl">
            {/* LEFT */}
            <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-surface-alt)] flex items-center justify-center text-base shadow-sm">
                    {getIcon(tx.transaction_type)}
                </div>

                <div className="space-y-0.5">
                    {/* TITLE */}
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {getTitle(tx)}
                    </div>

                    {/* SUBTITLE */}
                    <div className="text-xs text-[var(--text-secondary)]">
                        {getSubtitle(tx)}
                    </div>

                    {/* DATE */}
                    <div className="text-[11px] text-[var(--text-muted)]">
                        {new Date(tx.created_at).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
                <div
                    className={`text-sm font-semibold ${
                        isPositive
                            ? "text-[var(--color-success)]"
                            : "text-[var(--color-error)]"
                    }`}
                >
                    {isPositive ? "+" : "-"} Rp{" "}
                    {Math.abs(tx.amount).toLocaleString("id-ID")}
                </div>

                {/* OPTIONAL STATUS */}
                {tx.meta?.status && (
                    <div className="text-[11px] text-[var(--text-muted)]">
                        {tx.meta?.status}
                    </div>
                )}
            </div>
        </div>
    );
}
