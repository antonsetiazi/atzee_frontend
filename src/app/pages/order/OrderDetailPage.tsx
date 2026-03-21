// src/app/pages/order/OrderDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "@/business/order/order.hooks";
import OrderDetailView from "@/core/ui/views/order/OrderDetailView";

export default function OrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOrderById } = useOrders();

    const order = id ? getOrderById(id) : null;

    if (!order) {
        return <div className="p-4">Order tidak ditemukan</div>;
    }

    return <OrderDetailView order={order} onBack={() => navigate("/orders")} />;
}
