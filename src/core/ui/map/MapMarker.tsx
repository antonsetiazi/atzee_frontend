// src/core/ui/map/MapMarker.tsx

import { Marker } from "react-leaflet";

interface Props {
    position: [number, number];
}

export default function MapMarker({ position }: Props) {
    return <Marker position={position} />;
}
