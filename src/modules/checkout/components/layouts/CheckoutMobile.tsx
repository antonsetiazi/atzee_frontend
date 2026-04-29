// src/modules/checkout/components/layouts/CheckoutMobile.tsx
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
    paymentMethod: string | null;

    onPay: () => void;
    onCancel: () => void;
    isSubmitting: boolean;

    selectedAddress: any;
    selectedPartner: any;

    addressModalOpen: boolean;
    setAddressModalOpen: (v: boolean) => void;
}

export default function CheckoutMobile({
    items,
    fees,
    subtotal,
    total,
    paymentMethod,
    onPay,
    onCancel,
    isSubmitting,
    selectedAddress,
    selectedPartner,
    addressModalOpen,
    setAddressModalOpen,
}: Props) {
    const isValid =
        items.length > 0 && selectedAddress && selectedPartner && paymentMethod;

    return (
        <>
            <HeaderPage title="Checkout" subtitle="" />
            <div className="p-4 pb-[256px]">
                {/* CONTENT */}
                <div className="space-y-4">
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

                {/* STICKY CTA */}
                <div
                    className="fixed bottom-0 left-0 right-0 z-40 p-4 space-y-3 backdrop-blur-xl border-t"
                    style={{
                        borderColor: "var(--color-border)",
                        background: "rgba(255,255,255,0.9)",
                    }}
                >
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[var(--text-muted)]">
                            Total
                        </p>
                        <p className="text-lg font-bold text-[var(--color-primary)]">
                            Rp {total.toLocaleString()}
                        </p>
                    </div>

                    <button
                        onClick={onPay}
                        disabled={!isValid || isSubmitting}
                        className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                        style={{ background: "var(--color-primary)" }}
                    >
                        {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                    </button>

                    <button
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-2xl border font-semibold transition-all disabled:opacity-50"
                        style={{
                            borderColor: "var(--color-border)",
                            color: "var(--text-muted)",
                        }}
                    >
                        Batalkan Booking
                    </button>

                    <p className="text-xs text-center text-[var(--text-muted)]">
                        🔒 Pembayaran aman & terenkripsi
                    </p>
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
