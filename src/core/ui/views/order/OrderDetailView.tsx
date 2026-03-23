// src/core/ui/views/order/OrderDetailView.tsx

import type { Order } from "@/business/order/order.types";
import OrderTimeline from "./OrderTimeline";
import OrderItemRow from "./OrderItemRow";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

interface Props {
    order: Order;
    onBack: () => void;
}

export default function OrderDetailView({ order, onBack }: Props) {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <button onClick={onBack}>← Kembali</button>

            {/* HEADER */}
            <div className="p-4 rounded-2xl border bg-[var(--color-surface)]">
                <h2 className="font-bold text-lg">
                    Order #{order.id.slice(0, 6)}
                </h2>

                <p className="text-sm text-[var(--text-muted)]">
                    {formatValue(order.createdAt, { format: "datetime" })}
                </p>

                <p className="mt-2">Metode Pembayaran: {order.paymentMethod}</p>

                <p className="font-semibold mt-2">
                    Total:{" "}
                    {formatValue(order.total, {
                        format: "currency",
                        currency: DEFAULT_CURRENCY,
                        locale: DEFAULT_LOCALE,
                    })}
                </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">
                <h3 className="font-semibold">Item</h3>

                {order.items.map((item) => (
                    <OrderItemRow
                        key={item.id}
                        item={item}
                        orderStatus={order.status}
                        userId={order.userId} // ✅ FIX
                        userName={order.userName} // ✅ FIX
                    />
                ))}
            </div>

            {/* TIMELINE */}
            <OrderTimeline status={order.status} />
        </div>
    );
}
