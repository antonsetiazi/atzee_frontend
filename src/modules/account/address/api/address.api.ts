// src/modules/account/address/api/address.api.ts

import type { Address } from "../types/address.types";
import {
    httpGet,
    httpPost,
    httpPatch,
    httpDelete,
} from "@/core/http/http.client";

export function fetchAddresses(): Promise<Address[]> {
    return httpGet("/account/address/");
}

export function fetchAddress(id: string): Promise<Address> {
    return httpGet(`/account/address/${id}/`);
}

export function createAddress(data: Address): Promise<Address> {
    return httpPost("/account/address/", data);
}

export function updateAddress(id: string, data: Address): Promise<Address> {
    return httpPatch(`/account/address/${id}/`, data);
}

export function deleteAddress(id: string): Promise<void> {
    return httpDelete(`/account/address/${id}/`);
}
