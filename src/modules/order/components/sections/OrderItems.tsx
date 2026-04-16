// src/modules/order/components/sections/OrderItems.tsx

import type { Order } from "@/business/order/order.types";
import OrderItemRow from "../OrderItemRow";

export default function OrderItems({ order }: { order: Order }) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Item Pesanan</h3>

            <div className="space-y-3">
                {order.items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
