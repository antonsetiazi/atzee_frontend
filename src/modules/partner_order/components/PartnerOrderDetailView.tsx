// src/modules/partner_order/components/PartnerOrderDetailView.tsx

import { useState } from "react";
import type { Order } from "@/business/order/order.types";
import { HeaderPage } from "@/core/ui/components";
import PartnerOrderTimeline from "./PartnerOrderTimeline";
import { acceptOrderApi } from "../partner_order.api";
import { useConfirm } from "@/core/confirm/useConfirm";
import { useFeedback } from "@/core/feedback/useFeedback";

interface Props {
    order: Order;
}

export default function PartnerOrderDetailView({ order }: Props) {
    const [loading, setLoading] = useState(false);

    const confirm = useConfirm();
    const feedback = useFeedback();

    const handleAccept = async () => {
        const approved = await confirm({
            title: "Terima Order",
            message: "Apakah kamu yakin ingin menerima order ini?",
            level: "info",
        });

        if (!approved) return;

        setLoading(true);

        try {
            await acceptOrderApi(order.id);

            feedback.success("Order berhasil diterima", "Berhasil");

            // 🔥 refresh data
            window.location.reload();
        } catch (err) {
            console.error(err);
            feedback.error("Gagal menerima order", "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async () => {
        setLoading(true);
        try {
            feedback.info("Layanan dimulai");
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            feedback.success("Layanan selesai");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderPage title="Detail Order" />

            <div className="p-4 space-y-6">
                {/* HEADER */}
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
                    <p className="font-semibold">Order #{order.order_number}</p>

                    <p className="text-sm text-gray-500">{order.status}</p>
                </div>

                {/* CUSTOMER */}
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold">{order.userName || "User"}</p>
                </div>

                {/* ITEMS */}
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white space-y-2">
                    {order.items.map((item) => (
                        <div key={item.id}>
                            {item.name} x {item.quantity}
                        </div>
                    ))}
                </div>

                {/* TIMELINE */}
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
                    <PartnerOrderTimeline status={order.status} />
                </div>

                {/* ACTION BUTTONS */}
                <div className="space-y-2">
                    {order.status === "pending" && (
                        <button
                            onClick={handleAccept}
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl"
                        >
                            Terima Order
                        </button>
                    )}

                    {order.status === "accepted" && (
                        <button
                            onClick={handleStart}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl"
                        >
                            Mulai Layanan
                        </button>
                    )}

                    {order.status === "on_going" && (
                        <button
                            onClick={handleComplete}
                            className="w-full py-3 bg-green-600 text-white rounded-xl"
                        >
                            Selesaikan
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
