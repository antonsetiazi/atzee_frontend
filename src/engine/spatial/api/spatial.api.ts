// src/engine/spatial/api/spatial.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "@/core/http/http.client";

/* ===========================
   LIST LOCATIONS
   =========================== */

export async function fetchLocations(entity: string, id: string) {
    return httpPost("/entities/core/spatial.location.list/query/", {
        related_entity: entity,
        related_id: id,
    });
}

/* ===========================
   ATTACH LOCATION
   =========================== */

export async function attachLocation(data: {
    related_entity: string;
    related_id: string;
    latitude: number;
    longitude: number;
    label?: string;
    metadata?: Record<string, any>;
}) {
    return httpPost("/entities/core/spatial.location.attach/execute/", data);
}

/* ===========================
   UPDATE LOCATION
   =========================== */

export async function updateLocation(data: {
    id: string;
    latitude?: number;
    longitude?: number;
    label?: string;
    metadata?: Record<string, any>;
}) {
    return httpPost("/entities/core/spatial.location.update/execute/", data);
}

/* ===========================
   DELETE LOCATION
   =========================== */

export async function deleteLocation(data: { id: string }) {
    return httpPost("/entities/core/spatial.location.delete/execute/", data);
}
