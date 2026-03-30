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

function getStatusStyle(status: string) {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "failed":
            return "bg-red-100 text-red-600";
        case "completed":
            return "bg-blue-100 text-blue-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

export default function OrderDetailView({ order, onBack }: Props) {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* BACK */}
            <button
                onClick={onBack}
                className="text-sm text-gray-500 hover:text-black"
            >
                ← Kembali
            </button>

            {/* HEADER CARD */}
            <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white space-y-3 shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">
                        Order #
                        {order.order_number || String(order.id).slice(0, 6)}
                    </h2>

                    <span
                        className={`
                            px-3 py-1 text-xs rounded-full font-medium
                            ${getStatusStyle(order.status)}
                        `}
                    >
                        {order.status}
                    </span>
                </div>

                <p className="text-sm text-gray-500">
                    {formatValue(order.createdAt, { format: "datetime" })}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)]">
                    <p className="text-sm text-gray-500">Metode Pembayaran</p>
                    <p className="font-medium">{order.paymentMethod}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-lg">
                        {formatValue(order.total, {
                            format: "currency",
                            currency: DEFAULT_CURRENCY,
                            locale: DEFAULT_LOCALE,
                        })}
                    </p>
                </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Item Pesanan</h3>

                <div className="space-y-3">
                    {order.items.map((item) => (
                        <OrderItemRow
                            key={item.id}
                            item={item}
                            orderStatus={order.status}
                            userId={order.userId}
                            userName={order.userName}
                        />
                    ))}
                </div>
            </div>

            {/* TIMELINE */}
            <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                <OrderTimeline status={order.status} />
            </div>
        </div>
    );
}
