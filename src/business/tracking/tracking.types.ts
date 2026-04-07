// src/business/tracking/tracking.types.ts

export interface TrackingLocation {
    latitude: number | null;
    longitude: number | null;
}

export interface OrderTrackingData {
    partner_id: number;
    location: TrackingLocation;
    destination: {
        latitude?: number;
        longitude?: number;
        address_line?: string;
    };
}
