// src/modules/order/pages/OrderDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import OrderDetailView from "../components/OrderDetailView";
import { getOrderDetailApi } from "@/business/order/order.api";
import { useOrderBooking } from "../hooks/useOrderBooking";

export default function OrderDetailPage() {
    const { id } = useParams();
    const { getOrderById } = useOrders();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!id) return;

            // 1. coba ambil dari store dulu
            const data = getOrderById(id);

            // 2. tetap fetch fresh dari API (🔥 ini kunci)
            try {
                const fresh = await getOrderDetailApi(id);
                setOrder(fresh);
            } catch (err) {
                console.error(err);
                setOrder(data);
            } finally {
                setLoading(false);
            }
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const { booking, loading: bookingLoading } = useOrderBooking(order);

    if (loading || bookingLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (!order) {
        return <div className="p-4">Order tidak ditemukan</div>;
    }

    return <OrderDetailView order={order} booking={booking} />;
}
