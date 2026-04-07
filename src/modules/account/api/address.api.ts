// src/modules/account/api/address.api.ts

import { httpGet } from "@/core/http/http.client";

export interface UserAddress {
    id: number;
    label: string;
    address_line: string;
    city: string;
    is_default: boolean;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
    return httpGet<UserAddress[]>("/account/address/");
}
