// src/modules/checkout/components/CheckoutView.tsx

import OrderSummary from "./OrderSummary";

import type { CheckoutItem } from "@/business/checkout/checkout.types";

interface Props {
    items: CheckoutItem[];
    onPay: () => void;

    isSubmitting: boolean;
}

export default function CheckoutView({ items, onPay, isSubmitting }: Props) {
    const isValid = items.length > 0;

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Checkout</h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Pastikan pesanan kamu sudah benar sebelum melanjutkan
                    pembayaran
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-4">
                    {/* 🧾 CONTEXT CARD */}
                    <div
                        className="
                        p-4 rounded-2xl
                        border border-[var(--color-border)]
                        bg-gradient-to-br from-[var(--color-surface)] to-white
                        shadow-sm
                    "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            Kamu akan melakukan pembayaran untuk:
                        </p>
                    </div>

                    <OrderSummary items={items} detailed />

                    {/* 💡 PAYMENT INFO */}
                    <div
                        className="
                        p-4 rounded-2xl
                        border border-dashed border-[var(--color-border)]
                        bg-[var(--color-surface)]
                    "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            💳 Metode pembayaran akan dipilih di langkah
                            berikutnya setelah kamu menekan tombol{" "}
                            <b>Bayar Sekarang</b>.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-4 lg:sticky lg:top-4 h-fit">
                    <div
                        className="
                        p-5 rounded-2xl 
                        border border-[var(--color-border)] 
                        bg-gradient-to-br from-white to-[var(--color-surface)]
                        shadow-md
                    "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            Total Pembayaran
                        </p>

                        <p className="text-3xl font-bold text-[var(--color-primary)] mt-1">
                            Rp{" "}
                            {items
                                .reduce(
                                    (acc, item) =>
                                        acc + item.price * item.quantity,
                                    0,
                                )
                                .toLocaleString()}
                        </p>

                        {/* subtle divider */}
                        <div className="my-4 border-t border-[var(--color-border)]" />

                        <button
                            onClick={onPay}
                            disabled={!isValid || isSubmitting}
                            className="
                            w-full py-3 rounded-xl
                            bg-[var(--color-primary)]
                            text-white font-semibold
                            shadow-md
                            hover:opacity-90 transition
                            disabled:opacity-50
                        "
                        >
                            {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                        </button>

                        {/* 🔒 TRUST BADGE */}
                        <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                            🔒 Pembayaran aman & terenkripsi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
