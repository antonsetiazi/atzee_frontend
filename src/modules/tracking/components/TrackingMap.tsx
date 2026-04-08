// src/modules/tracking/components/TrackingMap.tsx

import MapView from "@/core/ui/map/MapView";
import MapMarker from "@/core/ui/map/MapMarker";
import type { OrderTrackingData } from "@/business/tracking/tracking.types";
import { Polyline } from "react-leaflet";

interface Props {
    data: OrderTrackingData;
}

export default function TrackingMap({ data }: Props) {
    const partner = data.location;
    const destination = data.destination;

    if (!partner.latitude || !partner.longitude) {
        return <div>Menunggu lokasi partner...</div>;
    }

    const points: [number, number][] = [[partner.latitude, partner.longitude]];

    if (destination.latitude && destination.longitude) {
        points.push([destination.latitude, destination.longitude]);
    }

    return (
        <MapView
            center={[partner.latitude, partner.longitude]}
            bounds={points} // 🔥 AUTO FIT
        >
            {/* 🟢 Partner */}
            <MapMarker position={[partner.latitude, partner.longitude]} />

            {/* 🔴 User */}
            {destination.latitude && destination.longitude && (
                <MapMarker
                    position={[destination.latitude, destination.longitude]}
                    variant="destination"
                />
            )}

            {/* 🔥 GARIS ANTARA PARTNER & USER */}
            {points.length > 1 && (
                <Polyline
                    positions={points}
                    pathOptions={{
                        color: "#3B82F6",
                        weight: 4,
                        opacity: 0.8,
                        dashArray: "6, 8", // 🔥 garis putus-putus
                    }}
                />
            )}
        </MapView>
    );
}
