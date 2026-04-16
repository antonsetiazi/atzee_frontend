// src/modules/order/components/sections/OrderTracking.tsx

import type { Order } from "@/business/order/order.types";
import { useNavigate } from "react-router-dom";

export default function OrderTracking({ order }: { order: Order }) {
    const navigate = useNavigate();
    return (
        <>
            {order.partner &&
                ["accepted", "on_going"].includes(order.status) && (
                    <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                        <button
                            onClick={() => navigate(`/tracking/${order.id}`)}
                            className="w-full py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            Lacak Partner
                        </button>

                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Lihat posisi partner secara real-time
                        </p>
                    </div>
                )}
        </>
    );
}
