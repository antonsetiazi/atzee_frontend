// src/core/ui/utils/orderStatus.ts

import type { OrderStatus } from "@/business/order/order.types";

export function getOrderStatusColor(status: OrderStatus) {
    switch (status) {
        case "completed":
            return "text-green-600";
        case "paid":
            return "text-blue-600";
        case "pending":
            return "text-yellow-600";
        case "failed":
            return "text-red-600";
        case "cancelled":
            return "text-gray-500";
        default:
            return "";
    }
}
