// src/modules/account/address/components/AddressForm.tsx

import { useEffect, useState } from "react";
import { fetchCountries, fetchRegions, fetchCities } from "../api/geo.api";

import type { Country, Region, City } from "../types/geo.types";

import AddressMapPicker from "./AddressMapPicker";
import type { Address, AddressPayload } from "../types/address.types";
import { Button } from "@/core/ui/components";

interface Props {
    initial?: Partial<Address>;
    onSubmit: (data: AddressPayload) => Promise<void>;
    loading?: boolean;
}

export default function AddressForm({ initial, onSubmit, loading }: Props) {
    const [form, setForm] = useState<Address>({
        label: initial?.label ?? "",
        recipient_name: initial?.recipient_name ?? "",
        phone: initial?.phone ?? "",
        address_line: initial?.address_line ?? "",
        country_ref: initial?.country_ref ?? undefined,
        region_ref: initial?.region_ref ?? undefined,
        city_ref: initial?.city_ref ?? undefined,
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

    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        async function loadCountries() {
            const data = await fetchCountries();
            setCountries(data);
        }

        loadCountries();
    }, []);

    useEffect(() => {
        async function loadRegions() {
            if (!form.country_ref) {
                setRegions([]);
                return;
            }

            const data = await fetchRegions(form.country_ref);
            setRegions(data);
        }

        loadRegions();
    }, [form.country_ref]);

    useEffect(() => {
        async function loadCities() {
            if (!form.region_ref) {
                setCities([]);
                return;
            }

            const data = await fetchCities(form.region_ref);
            setCities(data);
        }

        loadCities();
    }, [form.region_ref]);

    function update<K extends keyof Address>(key: K, value: Address[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            label: form.label,
            recipient_name: form.recipient_name,
            phone: form.phone,
            address_line: form.address_line,
            postal_code: form.postal_code,
            is_default: form.is_default,

            country_ref_id: form.country_ref,
            region_ref_id: form.region_ref,
            city_ref_id: form.city_ref,

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

                    <div className="space-y-3">
                        {/* Country */}
                        <select
                            className={inputCls}
                            value={form.country_ref ?? ""}
                            onChange={(e) => {
                                const val = Number(e.target.value) || undefined;

                                update("country_ref", val);
                                update("region_ref", undefined);
                                update("city_ref", undefined);
                            }}
                        >
                            <option value="">Select Country</option>
                            {countries.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {/* Region */}
                        <select
                            className={inputCls}
                            value={form.region_ref ?? ""}
                            onChange={(e) => {
                                const val = Number(e.target.value) || undefined;

                                update("region_ref", val);
                                update("city_ref", undefined);
                            }}
                        >
                            <option value="">Select Region</option>
                            {regions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {/* City */}
                        <select
                            className={inputCls}
                            value={form.city_ref ?? ""}
                            onChange={(e) => {
                                const val = Number(e.target.value) || undefined;
                                update("city_ref", val);
                            }}
                        >
                            <option value="">Select City</option>
                            {cities.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

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
