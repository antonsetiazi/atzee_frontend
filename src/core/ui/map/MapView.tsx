// src/core/ui/map/MapView.tsx

import { MapContainer, TileLayer } from "react-leaflet";

interface Props {
    children?: React.ReactNode;
    center: [number, number];
    zoom?: number;
}

export default function MapView({ center, zoom = 13, children }: Props) {
    return (
        <MapContainer center={center} zoom={zoom} className="w-full h-full">
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    );
}
