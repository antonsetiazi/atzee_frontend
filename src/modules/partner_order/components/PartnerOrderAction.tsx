// src/modules/partner_order/components/PartnerOrderAction.tsx

import type { Order } from "@/business/order/order.types";
import { useModal } from "@/core/modal/useModal";
import { usePartnerOrderActions } from "../hooks/usePartnerOrderActions";
import RejectOrderModal from "./RejectOrderModal";

export default function PartnerOrderAction({ order }: { order: Order }) {
    const { openModal } = useModal();
    const { loading, handleAccept, handleStart, handleComplete } =
        usePartnerOrderActions(order.id);

    return (
        <div className="space-y-2">
            {order.status === "pending" && (
                <div className="space-y-2">
                    <button
                        onClick={handleAccept}
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl"
                    >
                        Terima Order
                    </button>

                    <button
                        onClick={() =>
                            openModal(RejectOrderModal, {
                                orderId: order.id,
                            })
                        }
                        className="w-full py-3 bg-red-100 text-red-600 rounded-xl"
                    >
                        Tolak Order
                    </button>
                </div>
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
                <div className="space-y-2">
                    <button
                        onClick={handleComplete}
                        disabled={loading}
                        className="w-full py-3 bg-green-600 text-white rounded-xl"
                    >
                        Tandai Selesai
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        Dana akan masuk setelah customer mengkonfirmasi layanan
                        selesai
                    </p>
                </div>
            )}
        </div>
    );
}
