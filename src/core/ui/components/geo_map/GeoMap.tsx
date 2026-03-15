// src/core/ui/components/geo_map/GeoMap.tsx

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { GeoMapProps } from "./geo_map.types";

export default function GeoMap({
    center,
    zoom = 13,
    markers = [],
    height = 300,
    className = "",
}: GeoMapProps) {
    const defaultCenter = center ||
        markers[0] || { lat: -6.2, lng: 106.816666 };

    return (
        <div
            style={{ height }}
            className={`
                w-full
                overflow-hidden
                rounded-[var(--radius)]
                border border-[var(--color-border)]
                ${className}
            `}
        >
            <MapContainer
                center={[defaultCenter.lat, defaultCenter.lng]}
                zoom={zoom}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                        {marker.label && <Popup>{marker.label}</Popup>}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
