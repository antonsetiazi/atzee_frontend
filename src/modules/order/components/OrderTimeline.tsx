// src/modules/order/components/OrderTimeline.tsx

import type { OrderStatus } from "@/business/order/order.types";

const steps: OrderStatus[] = ["pending", "paid", "completed"];

function getLabel(step: OrderStatus) {
    switch (step) {
        case "pending":
            return "Menunggu Pembayaran";
        case "paid":
            return "Pembayaran Berhasil";
        case "completed":
            return "Selesai";
        default:
            return step;
    }
}

export default function OrderTimeline({ status }: { status: OrderStatus }) {
    const currentIndex = steps.indexOf(status);

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Status Pesanan</h3>

            <div className="space-y-3">
                {steps.map((step, index) => {
                    const isActive = index <= currentIndex;

                    return (
                        <div key={step} className="flex items-center gap-3">
                            <div
                                className={`
                                    w-4 h-4 rounded-full border-2 border-[var(--color-border)]
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

            {status === "failed" && (
                <p className="text-red-500 text-sm">
                    Pembayaran gagal, silakan coba lagi
                </p>
            )}
        </div>
    );
}
