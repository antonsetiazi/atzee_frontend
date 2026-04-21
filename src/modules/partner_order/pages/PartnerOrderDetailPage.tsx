// src/modules/partner_order/pages/PartnerOrderDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { usePartnerOrders } from "../hooks/usePartnerOrders";
import PartnerOrderDetailView from "../components/PartnerOrderDetailView";
import { useSessionStore } from "@/core/session/session.store";
import { useRequireLogin } from "@/core/auth/useRequireLogin";
import { chatService } from "@/business/chat/chat.service";

export default function PartnerOrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getOrderById } = usePartnerOrders();
    const { user } = useSessionStore();

    const { triggerLoginRequired } = useRequireLogin();

    const order = id ? getOrderById(id) : null;

    const handleChatNow = async () => {
        triggerLoginRequired(async () => {
            if (!order || !user) return;

            const targetUserId = order.customer?.id;

            if (!targetUserId) {
                alert("User customer tidak ditemukan");
                return;
            }

            const room = await chatService.getOrCreateRoom({
                currentUserId: String(user.id),
                targetUserId: String(targetUserId),

                context_type: "order",
                context_id: String(order.id),
            });

            navigate(`/chat/${room.id}`);
        });
    };

    if (!order) {
        return <div className="p-4">Order tidak ditemukan</div>;
    }

    return <PartnerOrderDetailView order={order} onChatNow={handleChatNow} />;
}
