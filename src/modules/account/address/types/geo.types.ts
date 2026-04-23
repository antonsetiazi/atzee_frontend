// src/modules/account/address/types/geo.types.ts

export interface Country {
    id: number;
    code: string;
    name: string;
}

export interface Region {
    id: number;
    code: string;
    name: string;
    country: number;
    country_name?: string;
}

export interface City {
    id: number;
    code: string;
    name: string;
    country: number;
    region: number;
    country_name?: string;
    region_name?: string;
}
