// // src/modules/checkout/components/layouts/CheckoutMobile.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import OrderSummary from "../OrderSummary";
import AddressSelectorModal from "../AddressSelectorModal";

import PartnerSection from "../sections/PartnerSection";
import AddressSection from "../sections/AddressSection";
import PaymentInfo from "../sections/PaymentInfo";

import type { CheckoutItem } from "@/business/checkout/checkout.types";
import { HeaderPage } from "@/core/ui/components";

interface Props {
    items: CheckoutItem[];

    fees: { name: string; amount: number }[];
    subtotal: number;
    total: number;

    onPay: () => void;
    onCancel: () => void;
    isSubmitting: boolean;

    selectedAddress: any;
    selectedPartner: any;

    addressModalOpen: boolean;
    setAddressModalOpen: (v: boolean) => void;
}

export default function CheckoutDesktop({
    items,
    fees,
    subtotal,
    total,
    onPay,
    onCancel,
    isSubmitting,
    selectedAddress,
    selectedPartner,
    addressModalOpen,
    setAddressModalOpen,
}: Props) {
    const isValid = items.length > 0;

    return (
        <>
            <HeaderPage
                title="Checkout"
                subtitle="Pastikan pesanan kamu sudah benar sebelum melanjutkan pembayaran"
            />

            <div className="max-w-6xl mx-auto p-4 space-y-6">
                {/* CONTENT */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-4">
                        <PartnerSection partner={selectedPartner} />

                        <AddressSection
                            address={selectedAddress}
                            onClick={() => setAddressModalOpen(true)}
                        />

                        <OrderSummary
                            items={items}
                            detailed
                            fees={fees}
                            subtotal={subtotal}
                            total={total}
                        />

                        <PaymentInfo />
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-4 lg:sticky lg:top-6 h-fit">
                        <div className="p-6 rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-white to-[var(--color-surface)] shadow-lg">
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
                                className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-semibold shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Memproses..."
                                    : "Bayar Sekarang"}
                            </button>

                            <button
                                onClick={onCancel}
                                disabled={isSubmitting}
                                className="w-full mt-3 py-4 rounded-2xl border font-semibold transition-all disabled:opacity-50"
                                style={{
                                    borderColor: "var(--color-border)",
                                    color: "var(--text-muted)",
                                }}
                            >
                                Batalkan Booking
                            </button>

                            <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                                🔒 Pembayaran aman & terenkripsi
                            </p>
                        </div>
                    </div>
                </div>

                {/* MODAL */}
                <AddressSelectorModal
                    open={addressModalOpen}
                    onClose={() => setAddressModalOpen(false)}
                />
            </div>
        </>
    );
}
