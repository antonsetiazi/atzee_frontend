// src/core/ui/map/MapView.tsx

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

interface Props {
    children?: React.ReactNode;
    center: [number, number];
    zoom?: number;
    bounds?: [number, number][];
}

function FitBounds({ bounds }: { bounds: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (bounds.length > 1) {
            const leafletBounds = L.latLngBounds(bounds);
            map.fitBounds(leafletBounds, { padding: [50, 50] });
        }
    }, [bounds, map]);

    return null;
}

export default function MapView({
    center,
    zoom = 13,
    children,
    bounds,
}: Props) {
    return (
        <MapContainer center={center} zoom={zoom} className="w-full h-full">
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {bounds && <FitBounds bounds={bounds} />}

            {children}
        </MapContainer>
    );
}
