// src/core/ui/views/order/OrderDetailView.tsx

import type { Order } from "@/business/order/order.types";
import OrderTimeline from "./OrderTimeline";

interface Props {
    order: Order;
    onBack: () => void;
}

export default function OrderDetailView({ order, onBack }: Props) {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <button onClick={onBack}>← Kembali</button>

            <div className="p-4 rounded-2xl border bg-[var(--color-surface)]">
                <h2 className="font-bold text-lg">
                    Order #{order.id.slice(0, 6)}
                </h2>

                <p className="text-sm text-[var(--text-muted)]">
                    {new Date(order.createdAt).toLocaleString()}
                </p>

                <p className="mt-2">Metode Pembayaran: {order.paymentMethod}</p>

                <p className="font-semibold mt-2">
                    Total: Rp {order.total.toLocaleString()}
                </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
                <h3 className="font-semibold">Item</h3>

                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="p-3 border rounded-xl flex justify-between"
                    >
                        <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-[var(--text-muted)]">
                                x{item.quantity}
                            </p>
                        </div>

                        <p>
                            Rp {(item.price * item.quantity).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* TIMELINE */}
            <OrderTimeline status={order.status} />
        </div>
    );
}
