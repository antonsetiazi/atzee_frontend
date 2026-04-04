// src/modules/checkout/components/CheckoutView.tsx

import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

import type { CheckoutItem } from "@/business/checkout/checkout.types";

type PaymentMethodType = {
    id: string;
    label: string;
};

interface Props {
    items: CheckoutItem[];

    paymentMethods: PaymentMethodType[];
    paymentMethodsLoading: boolean;

    selectedPaymentMethodId: string | null;

    onSelectPayment: (id: string) => void;
    onPay: () => void;

    isSubmitting: boolean;
}

export default function CheckoutView({
    items,
    paymentMethods,
    paymentMethodsLoading,
    selectedPaymentMethodId,
    onSelectPayment,
    onPay,
    isSubmitting,
}: Props) {
    const isValid = items.length > 0 && selectedPaymentMethodId;

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Checkout</h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Pastikan pesanan dan pembayaran sudah benar
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-4">
                    <OrderSummary items={items} detailed />

                    {paymentMethodsLoading ? (
                        <p className="text-sm text-[var(--text-muted)]">
                            Memuat metode pembayaran...
                        </p>
                    ) : paymentMethods.length === 0 ? (
                        <p className="text-sm text-red-500">
                            Metode pembayaran tidak tersedia
                        </p>
                    ) : (
                        <PaymentMethod
                            methods={paymentMethods}
                            selectedMethodId={selectedPaymentMethodId}
                            onSelect={onSelectPayment}
                        />
                    )}
                </div>

                {/* RIGHT (STICKY) */}
                <div className="space-y-4 lg:sticky lg:top-4 h-fit">
                    <div
                        className="
                            p-4 rounded-2xl 
                            border border-[var(--color-border)] 
                            bg-[var(--color-surface)] shadow
                        "
                    >
                        <p className="text-sm text-[var(--text-muted)]">
                            Total Pembayaran
                        </p>

                        <p className="text-2xl font-bold text-[var(--color-primary)]">
                            Rp{" "}
                            {items
                                .reduce(
                                    (acc, item) =>
                                        acc + item.price * item.quantity,
                                    0,
                                )
                                .toLocaleString()}
                        </p>

                        <button
                            onClick={onPay}
                            disabled={!isValid || isSubmitting}
                            className="
                                mt-4 w-full py-3 rounded-xl
                                bg-[var(--color-primary)]
                                text-white font-semibold
                                shadow
                                hover:opacity-90 transition
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
