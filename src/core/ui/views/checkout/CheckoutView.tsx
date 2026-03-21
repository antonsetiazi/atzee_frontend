// src/core/ui/views/checkout/CheckoutView.tsx

import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

import type { CheckoutItem, PaymentMethodType } from "./checkout.types";

interface Props {
    items: CheckoutItem[];

    paymentMethods: PaymentMethodType[];
    selectedPaymentMethodId: string | null;

    onSelectPayment: (id: string) => void;
    onPay: () => void;
}

export default function CheckoutView({
    items,
    paymentMethods,
    selectedPaymentMethodId,
    onSelectPayment,
    onPay,
}: Props) {
    const isValid = items.length > 0 && selectedPaymentMethodId;

    return (
        <div className="grid lg:grid-cols-3 gap-6 p-4">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4">
                <PaymentMethod
                    methods={paymentMethods}
                    selectedMethodId={selectedPaymentMethodId}
                    onSelect={onSelectPayment}
                />
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
                <OrderSummary items={items} />

                <button
                    onClick={onPay}
                    disabled={!isValid}
                    className="
                        w-full py-3 rounded-xl
                        bg-[var(--color-primary)]
                        text-white font-semibold
                        shadow-[var(--shadow)]
                        hover:opacity-90 transition
                        disabled:opacity-50
                    "
                >
                    Bayar Sekarang
                </button>
            </div>
        </div>
    );
}
