// src/modules/account/address/components/AddressForm.tsx

import { useState } from "react";
import AddressMapPicker from "./AddressMapPicker";
import type { Address } from "../types/address.types";
import { Button } from "@/core/ui/components";

interface Props {
    initial?: Partial<Address>;
    onSubmit: (data: Address) => Promise<void>;
    loading?: boolean;
}

export default function AddressForm({ initial, onSubmit, loading }: Props) {
    const [form, setForm] = useState<Address>({
        label: initial?.label ?? "",
        recipient_name: initial?.recipient_name ?? "",
        phone: initial?.phone ?? "",
        address_line: initial?.address_line ?? "",
        city: initial?.city ?? "",
        region: initial?.region ?? "",
        postal_code: initial?.postal_code ?? "",
        country: initial?.country ?? "Indonesia",
        latitude:
            initial?.latitude !== undefined && initial?.latitude !== null
                ? Number(initial.latitude)
                : null,

        longitude:
            initial?.longitude !== undefined && initial?.longitude !== null
                ? Number(initial.longitude)
                : null,
        is_default: initial?.is_default ?? false,
    });

    function update<K extends keyof Address>(key: K, value: Address[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            ...form,
            latitude:
                form.latitude !== null
                    ? Number(form.latitude.toFixed(6))
                    : null,
            longitude:
                form.longitude !== null
                    ? Number(form.longitude.toFixed(6))
                    : null,
        };

        await onSubmit(payload);
    }

    // 🔥 Premium input style
    const inputCls =
        "w-full rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm text-text-primary " +
        "placeholder:text-text-muted outline-none transition " +
        "focus:ring-2 focus:ring-primary focus:border-primary";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* =========================
                🔹 ADDRESS INFO
            ========================= */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                        Address Info
                    </h2>
                    <p className="text-sm text-text-muted">
                        Informasi penerima alamat
                    </p>
                </div>

                <div className="rounded-2xl p-5 shadow-sm space-y-3">
                    <input
                        className={inputCls}
                        value={form.label}
                        onChange={(e) => update("label", e.target.value)}
                        placeholder="Label (Rumah, Kantor)"
                    />

                    <input
                        className={inputCls}
                        placeholder="Recipient Name"
                        value={form.recipient_name}
                        onChange={(e) =>
                            update("recipient_name", e.target.value)
                        }
                    />

                    <input
                        className={inputCls}
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                    />
                </div>
            </section>

            {/* =========================
                🔹 LOCATION DETAIL
            ========================= */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                        Location Detail
                    </h2>
                    <p className="text-sm text-text-muted">
                        Detail alamat lengkap
                    </p>
                </div>

                <div className="rounded-2xl p-5 shadow-sm space-y-3">
                    <textarea
                        className={`${inputCls} min-h-[90px] resize-none`}
                        placeholder="Full Address"
                        value={form.address_line}
                        onChange={(e) => update("address_line", e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            className={inputCls}
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                        />

                        <input
                            className={inputCls}
                            placeholder="Postal Code"
                            value={form.postal_code}
                            onChange={(e) =>
                                update("postal_code", e.target.value)
                            }
                        />
                    </div>
                </div>
            </section>

            {/* =========================
                🔹 MAP (HIGHLIGHT)
            ========================= */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                        Pick Location
                    </h2>
                    <p className="text-sm text-text-muted">
                        Tentukan lokasi tepat pada peta
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md">
                    <AddressMapPicker
                        value={{
                            latitude: form.latitude,
                            longitude: form.longitude,
                        }}
                        onChange={(lat, lng) => {
                            // 🔥 FIX: limit ke 6 decimal (sesuai backend)
                            const fixedLat = Number(lat.toFixed(6));
                            const fixedLng = Number(lng.toFixed(6));
                            update("latitude", fixedLat);
                            update("longitude", fixedLng);
                        }}
                    />
                </div>
            </section>

            {/* =========================
                🔹 ACTION BAR
            ========================= */}
            <div className="sticky bottom-0 bg-background/80 backdrop-blur border-t border-[var(--color-border)] py-4 flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-text-secondary">
                    <input
                        type="checkbox"
                        checked={form.is_default}
                        onChange={(e) => update("is_default", e.target.checked)}
                        className="h-4 w-4 rounded border-border focus:ring-primary"
                    />
                    Set as default
                </label>

                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Address"}
                </Button>
            </div>
        </form>
    );
}
