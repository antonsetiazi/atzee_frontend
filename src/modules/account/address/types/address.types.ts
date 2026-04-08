// src/modules/account/address/types/address.types.ts

export interface Address {
    id?: string;

    label: string;
    recipient_name: string;
    phone: string;

    address_line: string;
    city: string;
    region?: string;
    postal_code?: string;
    country: string;

    latitude: number | null;
    longitude: number | null;

    is_default: boolean;
}
