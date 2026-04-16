// src/modules/order/components/sections/OrderAction.tsx

import { useState } from "react";
import type { Order } from "@/business/order/order.types";
import { useConfirm } from "@/core/confirm/useConfirm";
import { useFeedback } from "@/core/feedback/useFeedback";
import { orderStore } from "@/business/order/order.store";
import { completeOrderApi } from "@/business/order/order.api";

export default function OrderAction({ order }: { order: Order }) {
    const confirm = useConfirm();
    const feedback = useFeedback();
    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        const approved = await confirm({
            title: "Selesaikan Layanan",
            message: "Apakah Anda yakin layanan sudah selesai?",
            level: "info",
        });

        if (!approved) return;

        try {
            setLoading(true);
            await completeOrderApi(order.id);

            // 🔥 UPDATE LOCAL STORE
            orderStore.completeOrder(order.id);

            feedback.success("Pesanan berhasil diselesaikan", "Berhasil");
            window.location.reload();
        } catch (err) {
            console.error(err);
            feedback.error("Gagal menyelesaikan pesanan", "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {order.payment_status === "paid" &&
                ["accepted", "on_going", "completed_by_partner"].includes(
                    order.status,
                ) && (
                    <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                        <button
                            onClick={handleComplete}
                            disabled={loading}
                            className={`
                            w-full py-3 rounded-xl font-semibold transition
                            ${
                                loading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }
                        `}
                        >
                            {loading
                                ? "Memproses..."
                                : "Konfirmasi Layanan Selesai"}
                        </button>

                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Klik jika layanan sudah selesai dilakukan oleh
                            partner
                        </p>
                    </div>
                )}
        </>
    );
}
