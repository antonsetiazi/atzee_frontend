// src/modules/checkout/components/sections/PaymentInfo.tsx

import { useCheckout } from "@/modules/checkout/hooks/useCheckout";

export default function PaymentInfo() {
    const { paymentMethod } = useCheckout();
    const { setPaymentMethod } = useCheckout();

    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold">Metode Pembayaran</p>

            {/* WALLET */}
            <button
                onClick={() => setPaymentMethod("wallet")}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                    paymentMethod === "wallet"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--color-border)]"
                }`}
            >
                <p className="font-medium">💰 Wallet</p>
                <p className="text-xs text-[var(--text-muted)]">
                    Gunakan saldo wallet kamu untuk pembayaran instan
                </p>
            </button>

            {/* MIDTRANS */}
            <button
                onClick={() => setPaymentMethod("gopay")}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                    paymentMethod === "gopay"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--color-border)]"
                }`}
            >
                <p className="font-medium">💳 Payment Gateway</p>
                <p className="text-xs text-[var(--text-muted)]">
                    Virtual Account, E-Wallet, dan metode lainnya
                </p>
            </button>

            {!paymentMethod && (
                <p className="text-sm text-red-500">
                    Pilih metode pembayaran terlebih dahulu
                </p>
            )}
        </div>
    );
}
