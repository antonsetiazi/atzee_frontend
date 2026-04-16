// src/modules/partner_order/components/PartnerOrderHeader.tsx

import type { Order } from "@/business/order/order.types";
import { formatValue } from "@/shared/utils/formatValue";
import { getStatusColor, getStatusLabel } from "../utils/orderStatus";

export default function PartnerOrderHeader({ order }: { order: Order }) {
    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
            <p className="font-semibold">Order #{order.order_number}</p>

            <p className="text-xs text-gray-400 mt-1">
                Dibuat pada:{" "}
                {formatValue(order.createdAt, { format: "datetime" })}
            </p>
            <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${getStatusColor(
                    order.status,
                )}`}
            >
                {getStatusLabel(order.status)}
            </span>
        </div>
    );
}
