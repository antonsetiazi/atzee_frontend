// src/modules/partner_order/components/PartnerOrderCustomer.tsx

import type { Order } from "@/business/order/order.types";

export default function PartnerOrderCustomer({ order }: { order: Order }) {
    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-semibold">{order.customer?.name || "User"}</p>
            <p className="text-sm text-gray-500">
                {order.customer?.phone || "-"}
            </p>
        </div>
    );
}
