// src/modules/account/address/components/AddressMapPicker.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

interface Props {
    value: {
        latitude: number | null;
        longitude: number | null;
    };
    onChange: (lat: number, lng: number) => void;
}

function MapClickHandler({ onSelect }: { onSelect: Props["onChange"] }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function AddressMapPicker({ value, onChange }: Props) {
    const [position, setPosition] = useState<[number, number] | null>(
        value.latitude && value.longitude
            ? [value.latitude, value.longitude]
            : null,
    );

    const center: [number, number] = position ?? [-6.2, 106.816666];

    function handleSelect(lat: number, lng: number) {
        setPosition([lat, lng]);
        onChange(lat, lng);
    }

    return (
        <div className="rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[var(--color-border)] bg-gray-50">
                <h3 className="font-semibold">Pick Location</h3>
                <p className="text-sm text-gray-500">
                    Klik pada peta untuk menentukan lokasi
                </p>
            </div>

            <div style={{ height: 300 }}>
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: "100%" }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onSelect={handleSelect} />
                    {position && (
                        <Marker
                            position={position}
                            draggable
                            eventHandlers={{
                                dragend: (e) => {
                                    const marker = e.target;
                                    const pos = marker.getLatLng();
                                    handleSelect(pos.lat, pos.lng);
                                },
                            }}
                        />
                    )}
                </MapContainer>
            </div>

            {position && (
                <div className="p-3 text-xs text-gray-500 border-t border-[var(--color-border)]">
                    {Number(position[0]).toFixed(6)},{" "}
                    {Number(position[1]).toFixed(6)}
                </div>
            )}
        </div>
    );
}
