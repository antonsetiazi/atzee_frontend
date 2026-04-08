// src/modules/account/address/hooks/useAddressForm.ts

import { useState } from "react";
import type { Address } from "../types/address.types";

export function useAddressForm(initial?: Partial<Address>) {
    const [form, setForm] = useState<Address>({
        label: initial?.label ?? "",
        recipient_name: initial?.recipient_name ?? "",
        phone: initial?.phone ?? "",
        address_line: initial?.address_line ?? "",
        city: initial?.city ?? "",
        region: initial?.region ?? "",
        postal_code: initial?.postal_code ?? "",
        country: initial?.country ?? "Indonesia",
        latitude: initial?.latitude ?? null,
        longitude: initial?.longitude ?? null,
        is_default: initial?.is_default ?? false,
    });

    function update<K extends keyof Address>(key: K, value: Address[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    return { form, update, setForm };
}
