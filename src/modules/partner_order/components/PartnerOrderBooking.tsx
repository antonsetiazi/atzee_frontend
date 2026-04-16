// src/modules/partner_order/components/PartnerOrderBooking.tsx

import type { Order } from "@/business/order/order.types";
import { formatValue } from "@/shared/utils/formatValue";

export default function PartnerOrderBooking({ order }: { order: Order }) {
    if (!order.booking) return;

    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
            <p className="text-sm text-gray-500 mb-2">Jadwal Layanan</p>

            <p className="font-semibold">
                {formatValue(order.booking.start_time, {
                    format: "date",
                })}
            </p>

            <p className="text-sm text-gray-600">
                {formatValue(order.booking.start_time, {
                    format: "time",
                })}{" "}
                -{" "}
                {formatValue(order.booking.end_time, {
                    format: "time",
                })}
            </p>

            {order.booking.duration && (
                <p className="text-xs text-gray-400 mt-1">
                    Durasi:{" "}
                    {formatValue(order.booking.duration, {
                        suffix: " menit",
                    })}
                </p>
            )}
        </div>
    );
}
