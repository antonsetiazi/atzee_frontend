// src/core/ui/views/checkout/OrderSummary.tsx

import type { CheckoutItem } from "@/business/checkout/checkout.types";

interface Props {
    items: CheckoutItem[];
    detailed?: boolean;
}

export default function OrderSummary({ items, detailed }: Props) {
    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <div
            className="
                p-4 rounded-2xl space-y-4
                border border-[var(--color-border)]
                bg-[var(--color-surface)]
                shadow-[var(--shadow)]
            "
        >
            <h2 className="font-semibold text-lg">Ringkasan Pesanan</h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="
                            flex justify-between gap-3 text-sm 
                            border-b border-[var(--color-border)]
                            pb-3
                        "
                    >
                        <div className="space-y-1">
                            <p className="font-medium">{item.name}</p>

                            {detailed &&
                                item.entityType === "service" &&
                                item.meta && (
                                    <>
                                        <p className="text-xs text-gray-500">
                                            📅 {item.meta.date}
                                        </p>

                                        {item.meta.duration && (
                                            <p className="text-xs text-gray-500">
                                                ⏱ {item.meta.duration} menit
                                            </p>
                                        )}
                                    </>
                                )}

                            <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <div className="font-medium">
                            Rp {(item.price * item.quantity).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            {detailed && (
                <div
                    className="
                    border-t border-[var(--color-border)]
                    pt-3 flex justify-between font-semibold
                "
                >
                    <span>Total</span>
                    <span>Rp {total.toLocaleString()}</span>
                </div>
            )}
        </div>
    );
}
