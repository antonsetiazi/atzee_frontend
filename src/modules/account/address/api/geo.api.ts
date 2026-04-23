// src/modules/account/address/api/geo.api.ts

import { httpGet } from "@/core/http/http.client";
import type { Country, Region, City } from "../types/geo.types";

export function fetchCountries(): Promise<Country[]> {
    return httpGet("/countries/");
}

export function fetchRegions(countryId: number): Promise<Region[]> {
    return httpGet(`/regions/?country_id=${countryId}`);
}

export function fetchCities(regionId: number): Promise<City[]> {
    return httpGet(`/cities/?region_id=${regionId}`);
}
