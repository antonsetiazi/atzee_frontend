// src/modules/partner_order/components/PartnerOrderTimeline.tsx

import type { OrderStatus } from "@/business/order/order.types";

/**
 * UI FLOW STEPS (bukan backend status)
 */
const steps: OrderStatus[] = [
    "pending",
    "accepted",
    "on_going",
    "completed_by_partner",
    "completed",
];

function getLabel(step: OrderStatus) {
    switch (step) {
        case "pending":
            return "Order Masuk";
        case "accepted":
            return "Diterima";
        case "on_going":
            return "Sedang Berjalan";
        case "completed_by_partner":
            return "Menunggu Konfirmasi Customer";
        case "completed":
            return "Selesai";
        case "cancelled":
            return "Dibatalkan";
        default:
            return step;
    }
}

export default function PartnerOrderTimeline({
    status,
}: {
    status: OrderStatus;
}) {
    const isCancelled = status === "cancelled";
    const currentIndex = steps.indexOf(status);

    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white space-y-4">
            <h3 className="font-semibold text-lg">Status Layanan</h3>

            {/* CANCEL STATE */}
            {isCancelled && (
                <div className="p-3 rounded-xl border border-red-200 bg-red-50">
                    <p className="text-sm font-medium text-red-600">
                        Order dibatalkan
                    </p>
                </div>
            )}

            {/* TIMELINE */}
            <div className="space-y-3">
                {steps.map((step, index) => {
                    const isActive = index <= currentIndex;

                    return (
                        <div key={step} className="flex items-center gap-3">
                            <div
                                className={`
                                    w-4 h-4 rounded-full border-2
                                    ${
                                        isActive
                                            ? "bg-green-500 border-green-500"
                                            : "border-gray-300"
                                    }
                                `}
                            />

                            <p
                                className={`
                                    text-sm
                                    ${
                                        isActive
                                            ? "font-medium text-black"
                                            : "text-gray-400"
                                    }
                                `}
                            >
                                {getLabel(step)}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* INFO MESSAGE */}
            {status === "completed_by_partner" && (
                <p className="text-xs text-gray-500 text-center">
                    Dana akan masuk setelah customer konfirmasi
                </p>
            )}
        </div>
    );
}
