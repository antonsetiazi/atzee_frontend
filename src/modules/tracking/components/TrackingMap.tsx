// src/modules/tracking/components/TrackingMap.tsx

import MapView from "@/core/ui/map/MapView";
import MapMarker from "@/core/ui/map/MapMarker";
import type { OrderTrackingData } from "@/business/tracking/tracking.types";

interface Props {
    data: OrderTrackingData;
}

export default function TrackingMap({ data }: Props) {
    const partner = data.location;
    const destination = data.destination;

    if (!partner.latitude || !partner.longitude) {
        return <div>Menunggu lokasi partner...</div>;
    }

    return (
        <MapView center={[partner.latitude, partner.longitude]}>
            {/* Partner */}
            <MapMarker position={[partner.latitude, partner.longitude]} />

            {/* Destination */}
            {destination.latitude && destination.longitude && (
                <MapMarker
                    position={[destination.latitude, destination.longitude]}
                />
            )}
        </MapView>
    );
}
