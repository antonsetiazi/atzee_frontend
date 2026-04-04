// src/modules/order/hooks/useOrders.ts

import { useOrders as useOrdersCore } from "@/business/order/order.hooks";

export function useOrders() {
    const core = useOrdersCore();

    return {
        orders: core.orders,
        loading: core.loading,
        error: core.error,

        getOrderById: core.getOrderById,
    };
}
