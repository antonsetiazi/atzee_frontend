// src/modules/order/components/sections/OrderPartner.tsx

import type { Order } from "@/business/order/order.types";

export default function OrderPartner({ order }: { order: Order }) {
    return (
        <>
            {order.selectedPartner && !order.partner && (
                <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-2">
                    <p className="text-sm text-gray-500">
                        Menunggu konfirmasi dari partner
                    </p>

                    <p className="font-semibold">
                        {order.selectedPartner.name}
                    </p>

                    <p className="text-xs text-gray-400">
                        Partner akan segera menerima pesanan kamu
                    </p>
                </div>
            )}
        </>
    );
}
