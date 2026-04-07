// src/modules/partner_order/hooks/usePartnerOrders.ts

import { useEffect, useState } from "react";
import type { Order } from "@/business/order/order.types";

import {
    getPartnerOrdersApi,
    getPartnerOrderDetailApi,
} from "../partner_order.api";

export function usePartnerOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getPartnerOrdersApi();
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Gagal mengambil order partner");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    function getOrderById(id: string) {
        return orders.find((o) => o.id === id);
    }

    return {
        orders,
        loading,
        error,
        getOrderById,
        getOrderDetail: getPartnerOrderDetailApi,
    };
}
