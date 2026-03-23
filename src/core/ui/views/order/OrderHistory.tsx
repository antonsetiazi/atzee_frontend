// src/core/ui/views/order/OrderHistory.tsx

import type { Order } from "@/business/order/order.types";
import { useOrders } from "@/business/order/order.hooks";
import { getOrderStatusColor } from "../../utils/orderStatus";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

interface Props {
    onSelect: (order: Order) => void;
}

export default function OrderHistory({ onSelect }: Props) {
    const { orders } = useOrders();

    if (!orders.length) {
        return <p className="p-4">Belum ada order</p>;
    }

    return (
        <div className="p-4 space-y-3">
            {orders.map((o) => (
                <div
                    key={o.id}
                    onClick={() => onSelect(o)}
                    className="border p-3 rounded-xl cursor-pointer hover:bg-gray-50"
                >
                    <p className="font-semibold">#{o.id.slice(0, 6)}</p>

                    <p className="text-sm text-gray-500">
                        {new Date(o.createdAt).toLocaleString()}
                    </p>

                    <p className="mt-1">
                        Total:{" "}
                        {formatValue(o.total, {
                            format: "currency",
                            currency: DEFAULT_CURRENCY,
                            locale: DEFAULT_LOCALE,
                        })}
                    </p>

                    <p
                        className={`text-sm capitalize ${getOrderStatusColor(o.status)}`}
                    >
                        Status: {o.status}
                    </p>
                </div>
            ))}
        </div>
    );
}
