// src/modules/order/components/sections/OrderCard.tsx

import type { Order } from "@/business/order/order.types";
import { getStatusStyle } from "../../utils/orderStatus.utils";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

export default function OrderCard({ order }: { order: Order }) {
    return (
        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                    Order #{order.order_number || String(order.id).slice(0, 6)}
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
    );
}
