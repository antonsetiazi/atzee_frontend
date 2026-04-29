// src/modules/order/pages/OrderPage.tsx

import { useOrders } from "../hooks/useOrders";
import { formatValue } from "@/shared/utils/formatValue";
import { HeaderPage, PageSkeleton } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

function getStatusStyle(status: string) {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "failed":
            return "bg-red-100 text-red-600";
        case "completed":
            return "bg-blue-100 text-blue-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

function getStatusLabel(status: string) {
    switch (status) {
        case "paid":
            return "Dibayar";
        case "pending":
            return "Menunggu";
        case "failed":
            return "Gagal";
        case "completed":
            return "Selesai";
        default:
            return status;
    }
}

export default function OrderPage() {
    const { orders, loading, error } = useOrders();

    if (loading) return <PageSkeleton />;

    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <>
            <HeaderPage
                title="Pesanan Saya"
                subtitle="Riwayat transaksi Anda"
            />
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* EMPTY STATE */}
                {orders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Belum ada pesanan
                    </div>
                )}

                {/* LIST */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() =>
                                SmartNavigate.go(`/orders/${order.id}`)
                            }
                            className="
                            p-4 rounded-2xl border border-[var(--color-border)]
                            hover:shadow-md transition cursor-pointer
                            bg-white
                        "
                        >
                            {/* TOP */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-sm">
                                    Order #
                                    {order.order_number ||
                                        String(order.id).slice(0, 6)}
                                </p>

                                <span
                                    className={`
                                    px-2 py-1 text-xs rounded-full font-medium
                                    ${getStatusStyle(order.status)}
                                `}
                                >
                                    {getStatusLabel(order.status)}
                                </span>
                            </div>

                            {/* ITEMS PREVIEW */}
                            <div className="text-sm text-gray-600 mb-2 line-clamp-1">
                                {order.items?.map((i) => i.name).join(", ") ||
                                    "Item"}
                            </div>

                            {/* BOTTOM */}
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-gray-400">
                                    {formatValue(order.createdAt, {
                                        format: "datetime",
                                    })}
                                </div>

                                <div className="font-semibold">
                                    {formatValue(order.total || 0, {
                                        format: "currency",
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
