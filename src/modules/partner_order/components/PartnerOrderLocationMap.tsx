// src/modules/partner_order/components/PartnerOrderLocationMap.tsx

import type { Order } from "@/business/order/order.types";
import CustomerDestinationMap from "@/modules/tracking/components/CustomerDestinationMap";

export default function PartnerOrderLocationMap({ order }: { order: Order }) {
    return (
        <>
            {order.address?.latitude && order.address?.longitude && (
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-white">
                    <p className="text-sm text-gray-500 mb-3">
                        Lokasi Customer
                    </p>

                    <div className="h-[300px] rounded-xl overflow-hidden">
                        <CustomerDestinationMap
                            latitude={order.address.latitude}
                            longitude={order.address.longitude}
                        />
                    </div>

                    <a
                        href={`https://www.google.com/maps?q=${order.address.latitude},${order.address.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3 text-center py-2 rounded-lg border"
                    >
                        Buka di Google Maps
                    </a>
                </div>
            )}
        </>
    );
}
