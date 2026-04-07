// src/modules/checkout/components/AddressSelectorModal.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { checkoutStore } from "@/business/checkout/checkout.store";
import { getUserAddresses } from "@/modules/account/api/address.api";

/* ===========================
   📦 TYPE
=========================== */
type Address = {
    id: number;
    label: string;
    recipient_name: string;
    phone: string;
    address_line: string;
    city: string;
    is_default?: boolean;
};

/* ===========================
   📦 PROPS
=========================== */
interface Props {
    open: boolean;
    onClose: () => void;
}

/* ===========================
   🚀 COMPONENT
=========================== */
export default function AddressSelectorModal({ open, onClose }: Props) {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);

    /* ===========================
       📡 FETCH ADDRESS
    =========================== */
    useEffect(() => {
        if (!open) return;

        async function fetchAddresses() {
            setLoading(true);

            try {
                const data = await getUserAddresses();

                // 🔥 MAP API → UI TYPE
                const mapped: Address[] = data.map((a: any) => ({
                    id: a.id,
                    label: a.label,
                    recipient_name: a.recipient_name ?? "-",
                    phone: a.phone ?? "-",
                    address_line: a.address_line,
                    city: a.city,
                    is_default: a.is_default,
                }));

                setAddresses(mapped);

                // 🔥 AUTO SELECT DEFAULT (FIXED)
                const defaultAddr = mapped.find((a) => a.is_default);

                if (defaultAddr) {
                    checkoutStore.setState({
                        addressId: defaultAddr.id,
                        selectedAddress: {
                            id: defaultAddr.id,
                            label: defaultAddr.label,
                            recipient_name: defaultAddr.recipient_name,
                            phone: defaultAddr.phone,
                            address_line: defaultAddr.address_line,
                            city: defaultAddr.city,
                        },
                    });
                }
            } catch (err) {
                console.error("Failed to load addresses:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAddresses();
    }, [open]);

    /* ===========================
       🎯 SELECT ADDRESS
    =========================== */
    function handleSelect(address: Address) {
        checkoutStore.setState({
            addressId: address.id,
            selectedAddress: {
                id: address.id,
                label: address.label,
                recipient_name: address.recipient_name,
                phone: address.phone,
                address_line: address.address_line,
                city: address.city,
            },
        });

        onClose();
    }

    /* ===========================
       ❌ HIDE
    =========================== */
    if (!open) return null;

    /* ===========================
       🧱 UI
    =========================== */
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center">
            <div className="w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl p-4 space-y-4">
                <h2 className="text-lg font-semibold">Pilih Alamat</h2>

                {loading && (
                    <p className="text-sm text-gray-500">Loading alamat...</p>
                )}

                {!loading && addresses.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada alamat</p>
                )}

                <div className="space-y-2 max-h-80 overflow-auto">
                    {addresses.map((addr) => (
                        <button
                            key={addr.id}
                            onClick={() => handleSelect(addr)}
                            className="w-full p-3 border border-[var(--color-border)] rounded-xl text-left hover:bg-gray-50 transition"
                        >
                            <p className="font-medium">
                                {addr.label} {addr.is_default && "⭐"}
                            </p>

                            <p className="text-sm text-gray-600">
                                {addr.address_line}, {addr.city}
                            </p>

                            <p className="text-xs text-gray-500">
                                {addr.recipient_name} • {addr.phone}
                            </p>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-2 text-sm text-gray-500"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}
