// src/modules/order/pages/OrderDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import OrderDetailView from "../components/OrderDetailView";
import { getOrderDetailApi } from "@/business/order/order.api";
import { useOrderBooking } from "../hooks/useOrderBooking";
import { useSessionStore } from "@/core/session/session.store";
import { useRequireLogin } from "@/core/auth/useRequireLogin";
import { chatService } from "@/business/chat/chat.service";

export default function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getOrderById } = useOrders();
    const { user } = useSessionStore();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { triggerLoginRequired } = useRequireLogin();

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

    function handleChatNow() {
        triggerLoginRequired(() => {
            if (!order || !user) return;

            const targetUserId =
                order.partner_id ||
                order.owner_id ||
                booking?.partner_id ||
                booking?.ustadz_id;

            const room = chatService.getOrCreateRoom({
                currentUserId: String(user.id),
                targetUserId: String(targetUserId || "unknown"),
                context_type: "order",
                context_id: String(order.id),
            });

            navigate(`/chat/${room.id}`);
        });
    }

    if (loading || bookingLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (!order) {
        return <div className="p-4">Order tidak ditemukan</div>;
    }

    return (
        <OrderDetailView
            order={order}
            booking={booking}
            onChatNow={handleChatNow}
        />
    );
}
