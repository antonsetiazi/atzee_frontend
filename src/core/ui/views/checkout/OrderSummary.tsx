// src/core/ui/views/checkout/OrderSummary.tsx

import type { CheckoutItem } from "./checkout.types";

interface Props {
    items: CheckoutItem[];
}

export default function OrderSummary({ items }: Props) {
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
                    <div key={item.id} className="flex justify-between text-sm">
                        <div>
                            <p className="font-medium">{item.name}</p>

                            {item.type === "service" && item.meta && (
                                <p className="text-xs text-gray-500">
                                    {item.meta.date} • {item.meta.slotLabel}
                                </p>
                            )}

                            <p className="text-xs text-gray-500">
                                x{item.quantity}
                            </p>
                        </div>

                        <div className="font-medium">
                            Rp {(item.price * item.quantity).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
            </div>
        </div>
    );
}
