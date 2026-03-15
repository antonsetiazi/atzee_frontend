// src/core/ui/components/geo_map/geo_map.types.ts

export interface GeoPoint {
    lat: number;
    lng: number;
    label?: string;
}

export interface GeoMapProps {
    center?: GeoPoint;
    zoom?: number;
    markers?: GeoPoint[];
    height?: number;
    className?: string;
}
