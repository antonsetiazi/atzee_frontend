// src/modules/account/bank/pages/BankAccountPage.tsx

import { useState } from "react";
import { HeaderPage } from "@/core/ui/components";
import { useBanks, BankForm, BankCard, BankEmptyState } from "..";
import { useBankActions } from "../hooks/useBankActions";
import { useConfirm } from "@/core/confirm/useConfirm";

export default function BankAccountPage() {
    const confirm = useConfirm();
    const { data, loading, refetch } = useBanks();
    const { remove, update } = useBankActions();

    const [showForm, setShowForm] = useState(false);

    const handleDelete = async (id: string) => {
        const approved = await confirm({
            title: "Konfirmasi",
            message: "Yakin hapus rekening ini?",
            level: "info",
        });

        if (!approved) return;

        await remove(id);
        refetch();
    };

    const handleSetDefault = async (id: string) => {
        await update(id, { is_default: true });
        refetch();
    };

    return (
        <>
            <HeaderPage
                title="Rekening Bank"
                subtitle="Kelola rekening untuk penarikan dana"
            />

            <div className="p-5 space-y-5">
                {/* ADD BUTTON (ONLY IF HAS DATA) */}
                {data.length > 0 && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-full py-3 rounded-xl font-semibold"
                        style={{
                            background: "var(--color-primary)",
                            color: "#fff",
                        }}
                    >
                        {showForm ? "Tutup Form" : "Tambah Rekening"}
                    </button>
                )}

                {/* FORM */}
                {showForm && (
                    <BankForm
                        onSuccess={() => {
                            setShowForm(false);
                            refetch();
                        }}
                    />
                )}

                {/* LIST */}
                {loading ? (
                    <div className="text-sm text-gray-500">
                        Memuat rekening...
                    </div>
                ) : data.length === 0 && !showForm ? (
                    <BankEmptyState onAdd={() => setShowForm(true)} />
                ) : (
                    <div className="space-y-3">
                        {data.map((bank) => (
                            <div key={bank.id} className="space-y-2">
                                <BankCard bank={bank} />

                                {/* ACTIONS */}
                                <div className="flex gap-2 text-sm">
                                    {!bank.is_default && (
                                        <button
                                            onClick={() =>
                                                handleSetDefault(bank.id)
                                            }
                                            className="text-blue-600"
                                        >
                                            Jadikan Default
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(bank.id)}
                                        className="text-red-600"
                                    >
                                        Hapus
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
