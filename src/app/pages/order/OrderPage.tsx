// src/app/pages/order/OrderPage.tsx

import { useNavigate } from "react-router-dom";
import { useOrders } from "@/business/order/order.hooks";

export default function OrderPage() {
    const navigate = useNavigate();
    const { orders } = useOrders();

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-xl font-bold">Riwayat Pesanan</h1>

            {orders.map((order) => (
                <div
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="p-4 border rounded-xl cursor-pointer hover:bg-[var(--color-hover)]"
                >
                    <p className="font-semibold">
                        Order #{order.id.slice(0, 6)}
                    </p>

                    <p>Status: {order.status}</p>

                    <p>Total: Rp {order.total.toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}
