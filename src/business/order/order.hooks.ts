// src/business/order/order.hooks.ts

import { useEffect, useState } from "react";
import { orderStore } from "./order.store";
import { orderService } from "./order.service";

export function useOrders() {
    const [orders, setOrders] = useState(orderStore.getOrders());

    useEffect(() => {
        return orderStore.subscribe(() => {
            setOrders([...orderStore.getOrders()]);
        });
    }, []);

    return {
        orders,
        createFromCheckout: orderService.createFromCheckout,
        getOrderById: orderStore.getOrderById.bind(orderStore),
    };
}
