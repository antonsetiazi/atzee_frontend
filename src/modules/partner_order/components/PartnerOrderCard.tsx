// src/modules/partner_order/components/PartnerOrderCard.tsx

import type { Order } from "@/business/order/order.types";

interface Props {
    order: Order;
    onClick?: () => void;
}

function getStatusStyle(status: string) {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "accepted":
            return "bg-blue-100 text-blue-600";
        case "on_going":
            return "bg-indigo-100 text-indigo-600";
        case "completed":
            return "bg-green-100 text-green-600";
        case "cancelled":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

export default function PartnerOrderCard({ order, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className="p-4 rounded-2xl border border-[var(--color-border)] bg-white cursor-pointer hover:shadow-sm transition"
        >
            <div className="flex justify-between items-center">
                <p className="font-semibold">
                    #{order.order_number || order.id.slice(0, 6)}
                </p>

                <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                        order.status,
                    )}`}
                >
                    {order.status}
                </span>
            </div>

            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                {order.items?.map((i) => i.name).join(", ") || "Item"}
            </p>

            <p className="text-xs text-gray-400 mt-2">
                {new Date(order.createdAt).toLocaleString()}
            </p>
        </div>
    );
}
