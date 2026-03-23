// src/business/order/order.hooks.ts

import { useEffect, useState } from "react";
import { orderStore } from "./order.store";

export function useOrders() {
    const [orders, setOrders] = useState(orderStore.getOrders());

    useEffect(() => {
        return orderStore.subscribe((orders) => {
            setOrders([...orders]);
        });
    }, []);

    return {
        orders,
        getOrderById: orderStore.getOrderById.bind(orderStore),
    };
}
