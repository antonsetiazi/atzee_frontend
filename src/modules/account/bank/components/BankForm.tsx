// src/module/account/bank/components/BankForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useBankForm } from "../hooks/useBankForm";
import { useBankActions } from "../hooks/useBankActions";
import { useMasterBanks } from "../hooks/useMasterBanks";

export default function BankForm({ onSuccess }: { onSuccess: () => void }) {
    const { data: masterBanks } = useMasterBanks();
    const { form, setField } = useBankForm();
    const { create } = useBankActions();
    const [loading, setLoading] = useState(false);

    const isValid = form.bank_id && form.account_number && form.account_name;

    const handleSubmit = async () => {
        if (!isValid) return;

        setLoading(true);

        try {
            await create(form);
            onSuccess();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="p-5 space-y-5"
            style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
            }}
        >
            {/* HEADER */}
            <div>
                <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                >
                    Tambah Rekening
                </h3>
                <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Pastikan data rekening sesuai untuk menghindari kesalahan
                    transfer
                </p>
            </div>

            {/* INPUT GROUP */}
            <div className="space-y-4">
                {/* BANK NAME */}
                <div>
                    <label
                        className="text-sm mb-1 block"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Nama Bank
                    </label>
                    <select
                        value={form.bank_id || ""}
                        onChange={(e) => setField("bank_id", e.target.value)}
                        disabled={masterBanks.length === 0}
                        className="w-full px-4 py-3 outline-none"
                        style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius)",
                            background: "var(--color-background)",
                            color: "var(--text-primary)",
                        }}
                    >
                        <option value="">
                            {masterBanks.length === 0
                                ? "Memuat bank..."
                                : "Pilih Bank"}
                        </option>

                        {masterBanks.map((b: any) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ACCOUNT NUMBER */}
                <div>
                    <label
                        className="text-sm mb-1 block"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Nomor Rekening
                    </label>
                    <input
                        placeholder="Masukkan nomor rekening"
                        value={form.account_number}
                        onChange={(e) =>
                            setField("account_number", e.target.value)
                        }
                        className="w-full px-4 py-3 outline-none"
                        style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius)",
                            background: "var(--color-background)",
                            color: "var(--text-primary)",
                        }}
                    />
                </div>

                {/* ACCOUNT NAME */}
                <div>
                    <label
                        className="text-sm mb-1 block"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Nama Pemilik
                    </label>
                    <input
                        placeholder="Sesuai nama di rekening"
                        value={form.account_name}
                        onChange={(e) =>
                            setField("account_name", e.target.value)
                        }
                        className="w-full px-4 py-3 outline-none"
                        style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius)",
                            background: "var(--color-background)",
                            color: "var(--text-primary)",
                        }}
                    />
                </div>
            </div>

            {/* INFO BOX */}
            <div
                className="text-xs p-3"
                style={{
                    background: "var(--color-surface-alt)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-secondary)",
                }}
            >
                Pastikan nomor dan nama rekening benar. Kesalahan data dapat
                menyebabkan penarikan gagal.
            </div>

            {/* BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className="w-full py-3 font-semibold transition-all"
                style={{
                    borderRadius: "var(--radius)",
                    background: isValid
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    color: "#fff",
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? "Menyimpan..." : "Simpan Rekening"}
            </button>
        </div>
    );
}
