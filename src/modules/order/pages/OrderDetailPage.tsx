// src/modules/order/pages/OrderDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import OrderDetailView from "../components/OrderDetailView";

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
