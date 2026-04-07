// src/modules/partner_order/pages/PartnerOrderDetailPage.tsx

import { useParams } from "react-router-dom";
import { usePartnerOrders } from "../hooks/usePartnerOrders";
import PartnerOrderDetailView from "../components/PartnerOrderDetailView";

export default function PartnerOrderDetailPage() {
    const { id } = useParams();
    const { getOrderById } = usePartnerOrders();

    const order = id ? getOrderById(id) : null;

    if (!order) {
        return <div className="p-4">Order tidak ditemukan</div>;
    }

    return <PartnerOrderDetailView order={order} />;
}
