// src/modules/order/components/OrderTimeline.tsx

import type { OrderStatus } from "@/business/order/order.types";

const steps: OrderStatus[] = [
    "pending",
    "accepted",
    "on_going",
    "completed_by_partner",
    "completed",
    "cancelled",
];

function getLabel(step: OrderStatus) {
    switch (step) {
        case "pending":
            return "Menunggu Konfirmasi Partner";

        case "accepted":
            return "Partner Menerima Pesanan";

        case "on_going":
            return "Layanan Sedang Berlangsung";

        case "completed_by_partner":
            return "Menunggu Konfirmasi Anda";

        case "completed":
            return "Pesanan Selesai";

        case "cancelled":
            return "Pesanan Dibatalkan";

        default:
            return step;
    }
}

export default function OrderTimeline({ status }: { status: OrderStatus }) {
    if (status === "cancelled") {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Status Pesanan</h3>

                <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium">
                    Pesanan telah dibatalkan
                </div>
            </div>
        );
    }

    const currentIndex = steps.indexOf(status);

    return (
        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Status Pesanan</h3>

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
                                className={`text-sm ${
                                    isActive
                                        ? "text-black font-medium"
                                        : "text-gray-400"
                                }`}
                            >
                                {getLabel(step)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
