// src/modules/tracking/components/TrackingStatus.tsx

import type { OrderTrackingData } from "@/business/tracking/tracking.types";
import { calculateDistance } from "../utils/distance";

interface Props {
    data: OrderTrackingData;
}

export default function TrackingStatus({ data }: Props) {
    const partner = data.location;
    const destination = data.destination;
    // console.log(data);
    let distance = null;

    if (
        partner.latitude &&
        partner.longitude &&
        destination.latitude != null &&
        destination.longitude != null
    ) {
        distance = calculateDistance(
            partner.latitude,
            partner.longitude,
            destination.latitude,
            destination.longitude,
        );
    }

    return (
        <div className="p-4 bg-white border-t border-[var(--color-border)]">
            <p className="text-sm text-gray-600">
                Partner sedang menuju lokasi kamu
            </p>

            {distance && (
                <p className="text-sm font-semibold mt-1">
                    Jarak: {distance.toFixed(2)} km
                </p>
            )}
        </div>
    );
}
