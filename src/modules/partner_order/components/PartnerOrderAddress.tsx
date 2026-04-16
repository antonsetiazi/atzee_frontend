// src/modules/partner_order/components/PartnerOrderAddress.tsx

import type { Order } from "@/business/order/order.types";

export default function PartnerOrderAddress({ order }: { order: Order }) {
    if (!order.address) return;

    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
            <p className="text-sm text-gray-500 mb-2">Lokasi Tujuan</p>

            <p className="font-semibold">{order.address.recipient_name}</p>

            <p className="text-sm">{order.address.phone}</p>

            <p className="text-sm text-gray-600 mt-2">
                {order.address.address_line}
            </p>

            {order.address.notes && (
                <p className="text-xs text-gray-400 mt-2">
                    Catatan: {order.address.notes}
                </p>
            )}
        </div>
    );
}
