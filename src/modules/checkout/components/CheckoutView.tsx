// src/modules/checkout/components/CheckoutView.tsx

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import OrderSummary from "./OrderSummary";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import type { CheckoutItem } from "@/business/checkout/checkout.types";

interface Props {
    items: CheckoutItem[];
    onPay: () => void;
    isSubmitting: boolean;
}

export default function CheckoutView({ items, onPay, isSubmitting }: Props) {
    const { isMobile } = useBreakpoint();
    const navigate = useNavigate();

    const isValid = items.length > 0;

    const total = useMemo(() => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [items]);

    // ================================
    // 📱 MOBILE VERSION
    // ================================
    if (isMobile) {
        return (
            <div className="relative min-h-screen bg-[var(--color-background)]">
                {/* HEADER */}
                <div
                    className="
                        fixed top-0 left-0 right-0 z-40
                        px-4 pt-3 pb-3
                        flex items-center gap-3
                        backdrop-blur-xl border-b
                    "
                    style={{
                        borderColor: "var(--color-border)",
                        background: "rgba(255,255,255,0.75)",
                    }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            w-10 h-10 flex items-center justify-center
                            rounded-full
                            bg-white/80 backdrop-blur
                            shadow-md border
                            active:scale-95 transition
                        "
                        style={{
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-[var(--text-primary)]" />
                    </button>

                    <h1 className="text-base font-semibold">Checkout</h1>
                </div>

                {/* CONTENT */}
                <div className="pt-20 pb-32 px-4 space-y-4">
                    {/* ORDER */}
                    <OrderSummary items={items} detailed />

                    {/* INFO */}
                    <div
                        className="
                            p-4 rounded-2xl
                            border border-dashed border-[var(--color-border)]
                            bg-[var(--color-surface)]
                        "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            💳 Metode pembayaran akan dipilih setelah kamu
                            menekan <b>Bayar Sekarang</b>.
                        </p>
                    </div>
                </div>

                {/* STICKY CTA */}
                <div
                    className="
                        fixed bottom-0 left-0 right-0 z-40
                        p-4 space-y-3
                        backdrop-blur-xl border-t
                    "
                    style={{
                        borderColor: "var(--color-border)",
                        background: "rgba(255,255,255,0.9)",
                    }}
                >
                    {/* TOTAL */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[var(--text-muted)]">
                            Total
                        </p>
                        <p className="text-lg font-bold text-[var(--color-primary)]">
                            Rp {total.toLocaleString()}
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={onPay}
                        disabled={!isValid || isSubmitting}
                        className="
                            w-full py-4 rounded-2xl
                            font-semibold text-white
                            shadow-lg
                            transition-all
                            active:scale-[0.98]
                            disabled:opacity-50
                        "
                        style={{
                            background: "var(--color-primary)",
                        }}
                    >
                        {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                    </button>

                    <p className="text-xs text-center text-[var(--text-muted)]">
                        🔒 Pembayaran aman & terenkripsi
                    </p>
                </div>
            </div>
        );
    }

    // ================================
    // 💻 DESKTOP VERSION (UPGRADED)
    // ================================
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Pastikan pesanan kamu sudah benar sebelum melanjutkan
                    pembayaran
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-4">
                    <OrderSummary items={items} detailed />

                    <div
                        className="
                            p-4 rounded-2xl
                            border border-dashed border-[var(--color-border)]
                            bg-[var(--color-surface)]
                        "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            💳 Metode pembayaran akan dipilih setelah kamu
                            menekan <b>Bayar Sekarang</b>.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-4 lg:sticky lg:top-6 h-fit">
                    <div
                        className="
                            p-6 rounded-3xl
                            border border-[var(--color-border)]
                            bg-gradient-to-br from-white to-[var(--color-surface)]
                            shadow-lg
                        "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            Total Pembayaran
                        </p>

                        <p className="text-4xl font-bold text-[var(--color-primary)] mt-2">
                            Rp {total.toLocaleString()}
                        </p>

                        <div className="my-5 border-t border-[var(--color-border)]" />

                        <button
                            onClick={onPay}
                            disabled={!isValid || isSubmitting}
                            className="
                                w-full py-4 rounded-2xl
                                bg-[var(--color-primary)]
                                text-white font-semibold
                                shadow-lg
                                transition-all
                                hover:opacity-90
                                active:scale-[0.98]
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                        </button>

                        <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                            🔒 Pembayaran aman & terenkripsi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
