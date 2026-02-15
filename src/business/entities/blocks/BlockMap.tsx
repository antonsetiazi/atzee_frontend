/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockMap.tsx

import { useCallback, useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import LoadingState from "@/shared/ui/LoadingState";
import { button } from "@/core/ui/ui.class";
import {
    fetchLocations,
    attachLocation,
    updateLocation,
    deleteLocation,
} from "@/business/spatial/spatial.api";

/* ===========================
   FIX MARKER ICON
   =========================== */

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface Props {
    block: any;
    entityKey: string;
    id?: string;
}

/* ===========================
   CLICK HANDLER COMPONENT
   =========================== */

function MapClickHandler({
    onClick,
}: {
    onClick: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
}

/* ===========================
   MAIN COMPONENT
   =========================== */

export default function BlockMap({ block, id }: Props) {
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const entityType = block.entity_type;
    const entityId = id;
    const multiple = block.multiple ?? true;

    const load = useCallback(async () => {
        if (!entityId) return;

        setLoading(true);
        try {
            const res = await fetchLocations(entityType, entityId);
            setLocations(res.items ?? []);
        } finally {
            setLoading(false);
        }
    }, [entityType, entityId]);

    useEffect(() => {
        if (!entityId) return;
        load();
    }, [load, entityId]);

    async function handleAdd(lat: number, lng: number) {
        if (!entityId) return;

        if (!multiple && locations.length > 0) {
            await updateLocation({
                id: locations[0].id,
                latitude: lat,
                longitude: lng,
            });
        } else {
            await attachLocation({
                related_entity: entityType,
                related_id: entityId,
                latitude: lat,
                longitude: lng,
            });
        }

        await load();
    }

    async function handleDelete(locationId: string) {
        await deleteLocation({ id: locationId });
        await load();
    }

    if (!entityId) return null;
    if (loading) return <LoadingState />;

    const center =
        locations.length > 0
            ? [locations[0].latitude, locations[0].longitude]
            : [-6.2, 106.816666]; // default Jakarta

    return (
        <div>
            <div className="mb-4">
                <h3 className="text-md font-semibold">
                    {block.title ?? "Location"}
                </h3>
                {block.description && (
                    <p className="text-sm text-gray-500">{block.description}</p>
                )}
            </div>

            <div
                className="border rounded overflow-hidden"
                style={{ height: block.height ?? 400 }}
            >
                <MapContainer
                    center={center as any}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapClickHandler onClick={handleAdd} />

                    {locations.map((loc) => (
                        <Marker
                            key={loc.id}
                            position={[loc.latitude, loc.longitude]}
                            draggable
                            eventHandlers={{
                                dragend: async (e) => {
                                    const marker = e.target as L.Marker;
                                    const pos = marker.getLatLng();

                                    await updateLocation({
                                        id: loc.id,
                                        latitude: pos.lat,
                                        longitude: pos.lng,
                                    });

                                    await load();
                                },
                            }}
                        >
                            <Popup>
                                <div className="text-sm">
                                    <div>
                                        {loc.latitude}, {loc.longitude}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(loc.id)}
                                        className={`${button.base} ${button.danger} mt-2`}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
