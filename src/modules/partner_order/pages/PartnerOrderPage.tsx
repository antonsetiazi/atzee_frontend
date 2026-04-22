// src/modules/partner_order/pages/PartnerOrderPage.tsx

import { useNavigate } from "react-router-dom";
import { usePartnerOrders } from "../hooks/usePartnerOrders";
import { HeaderPage, PageSkeleton } from "@/core/ui/components";

function getStatusStyle(status: string) {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "accepted":
            return "bg-blue-100 text-blue-600";
        case "on_going":
            return "bg-indigo-100 text-indigo-600";
        case "completed":
            return "bg-green-100 text-green-600";
        case "cancelled":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

export default function PartnerOrderPage() {
    const navigate = useNavigate();
    const { orders, loading, error } = usePartnerOrders();

    if (loading) return <PageSkeleton />;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <>
            <HeaderPage
                title="Order Masuk"
                subtitle="Kelola pesanan pelanggan"
            />

            <div className="p-4 space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        onClick={() => navigate(`/partner/orders/${order.id}`)}
                        className="p-4 rounded-2xl border border-[var(--color-border)] bg-white cursor-pointer"
                    >
                        <div className="flex justify-between">
                            <p className="font-semibold">
                                #{order.order_number}
                            </p>

                            <span
                                className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                                    order.status,
                                )}`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            {order.items.map((i) => i.name).join(", ")}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
