// src/business/order/order.hooks.ts

import { useEffect, useState } from "react";
import { orderStore } from "./order.store";
import { getOrderDetailApi, getOrdersApi } from "./order.api";

export function useOrders() {
    const [orders, setOrders] = useState(orderStore.getOrders());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = orderStore.subscribe((orders) => {
            setOrders([...orders]);
        });

        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getOrdersApi();
                orderStore.setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Gagal mengambil data order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

        // 🔥 SMART POLLING
        const interval = setInterval(async () => {
            const currentOrders = orderStore.getOrders();

            for (const order of currentOrders) {
                // hanya pending & paid
                if (!["pending", "paid"].includes(order.status)) continue;

                try {
                    const updated = await getOrderDetailApi(order.id);

                    if (updated.status !== order.status) {
                        orderStore.updateStatus(order.id, updated.status);
                    }
                } catch (err) {
                    console.error("Polling error:", err);
                }
            }
        }, 500000);

        return () => {
            clearInterval(interval);
            unsubscribe();
        };
    }, []);

    return {
        orders,
        loading,
        error,
        getOrderById: orderStore.getOrderById.bind(orderStore),
    };
}
