// src/modules/account/address/pages/AddressListPage.tsx

import { useCallback, useEffect, useState } from "react";
import type { Address } from "../types/address.types";
import { useAddressActions } from "../hooks/useAddressActions";
import { Button, HeaderPage, PageSkeleton } from "@/core/ui/components";
import AddressEmptyState from "../components/AddressEmptyState";
import { useConfirm } from "@/core/confirm/useConfirm";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function AddressListPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const { deleteAddress, getAddresses } = useAddressActions();
    const confirm = useConfirm();

    const loadAddresses = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAddresses();
            setAddresses(data);
        } finally {
            setLoading(false);
        }
    }, [getAddresses]); // ✅ getAddresses dari hook jadi dependency

    useEffect(() => {
        loadAddresses();
    }, [loadAddresses]);

    async function handleDelete(id: string) {
        const approved = await confirm({
            title: "Konfirmasi",
            message: "Yakin akan hapus?",
            level: "info",
        });

        if (!approved) return;

        await deleteAddress(id);
        loadAddresses();
    }

    if (loading) return <PageSkeleton />;

    return (
        <>
            <HeaderPage
                title="Alamat Saya"
                subtitle="Kelola alamat pengiriman Anda"
            />
            <div className="p-4 space-y-6">
                <div className="flex justify-end">
                    <Button
                        onClick={() =>
                            SmartNavigate.go("/account/address/create")
                        }
                    >
                        Tambah Alamat Baru
                    </Button>
                </div>

                {addresses.length === 0 ? (
                    <AddressEmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {addresses.map((a) => (
                            <div
                                key={a.id}
                                className={`p-5 bg-surface border border-[var(--color-border)] rounded-2xl shadow-sm flex flex-col justify-between transition hover:shadow-lg ${
                                    a.is_default
                                        ? "border-primary"
                                        : "border-border"
                                }`}
                            >
                                <div className="space-y-1">
                                    <div className="font-semibold text-text-primary text-lg">
                                        {a.label}{" "}
                                        {a.is_default && (
                                            <span className="text-sm text-success font-medium">
                                                (Default)
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {a.recipient_name}
                                    </div>
                                    <div className="text-sm text-text-muted">
                                        {a.phone}
                                    </div>
                                    <div className="text-sm text-text-muted">
                                        {a.address_line}, {a.city}
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() =>
                                            SmartNavigate.go(
                                                `/account/address/edit/${a.id}`,
                                            )
                                        }
                                        className="flex-1 text-sm px-3 py-1 bg-surface-alt text-text-primary rounded-xl hover:bg-gray-100 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(a.id!)}
                                        className="flex-1 text-sm px-3 py-1 bg-error/20 text-error rounded-xl hover:bg-error/30 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
