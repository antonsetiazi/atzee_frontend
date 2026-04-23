// src/modules/account/address/types/address.types.ts

export interface Address {
    id?: string;

    label: string;
    recipient_name: string;
    phone: string;

    address_line: string;
    city: string;
    region?: string;
    country: string;

    country_ref?: number;
    region_ref?: number;
    city_ref?: number;

    country_name?: string;
    region_name?: string;
    city_name?: string;

    postal_code?: string;

    latitude: number | null;
    longitude: number | null;

    is_default: boolean;
}

export interface AddressPayload {
    label: string;
    recipient_name: string;
    phone: string;

    address_line: string;
    postal_code?: string;

    country_ref_id?: number;
    region_ref_id?: number;
    city_ref_id?: number;

    latitude: number | null;
    longitude: number | null;

    is_default: boolean;
}
