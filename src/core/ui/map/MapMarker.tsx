import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface Props {
    position: [number, number];
    variant?: "partner" | "destination";
}

// 🔥 Custom icons
const icons = {
    partner: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    }),

    destination: new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    }),
};

export default function MapMarker({ position, variant = "partner" }: Props) {
    return (
        <Marker position={position} icon={icons[variant]}>
            <Popup>
                {variant === "partner"
                    ? "Partner Location"
                    : "Your Destination"}
            </Popup>
        </Marker>
    );
}
