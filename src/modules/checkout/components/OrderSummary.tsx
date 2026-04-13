// src/modules/checkout/components/OrderSummary.tsx

import type { CheckoutItem } from "@/business/checkout/checkout.types";

interface Props {
    items: CheckoutItem[];
    detailed?: boolean;
    fees?: { name: string; amount: number }[];
    subtotal?: number;
    total?: number;
}

export default function OrderSummary({
    items,
    detailed,
    fees,
    subtotal,
    total,
}: Props) {
    const calculatedSubtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    const finalSubtotal = subtotal ?? calculatedSubtotal;
    const finalTotal = total ?? finalSubtotal;

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
                <>
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Rp {finalSubtotal.toLocaleString()}</span>
                    </div>

                    {fees?.map((fee, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span>{fee.name}</span>
                            <span>Rp {fee.amount.toLocaleString()}</span>
                        </div>
                    ))}

                    <div className="flex justify-between text-sm">
                        <span>Total</span>
                        <span>Rp {finalTotal.toLocaleString()}</span>
                    </div>
                </>
            )}
        </div>
    );
}
