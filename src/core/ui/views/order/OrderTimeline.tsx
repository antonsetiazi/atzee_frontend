// src/core/ui/views/order/OrderTimeline.tsx

import type { OrderStatus } from "@/business/order/order.types";

const steps = ["pending", "paid", "completed"];

export default function OrderTimeline({ status }: { status: OrderStatus }) {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold">Status</h3>

            {steps.map((step) => {
                const isActive =
                    step === status ||
                    (step === "pending" && status !== "failed");

                return (
                    <div key={step} className="flex items-center gap-3">
                        <div
                            className={`
                                w-3 h-3 rounded-full
                                ${isActive ? "bg-green-500" : "bg-gray-300"}
                            `}
                        />

                        <p className="capitalize">{step}</p>
                    </div>
                );
            })}

            {status === "failed" && (
                <p className="text-red-500 text-sm">Pembayaran gagal</p>
            )}
        </div>
    );
}
