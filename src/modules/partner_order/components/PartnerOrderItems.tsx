// src/modules/partner_order/components/PartnerOrderItems.tsx

import { formatValue } from "@/shared/utils/formatValue";
import type { Order } from "@/business/order/order.types";

export default function PartnerOrderItems({ order }: { order: Order }) {
    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white space-y-3">
            <p className="text-sm text-gray-500">Detail Pesanan</p>

            {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                    <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-500">
                            {item.quantity} x{" "}
                            {formatValue(item.price, { format: "currency" })}
                        </p>
                    </div>

                    <p>
                        {formatValue(item.price * item.quantity, {
                            format: "currency",
                        })}
                    </p>
                </div>
            ))}

            <div className="flex justify-between font-semibold">
                <span>Total Diterima</span>
                <span>
                    {formatValue(order.partner_earning, {
                        format: "currency",
                    })}
                </span>
            </div>
        </div>
    );
}
