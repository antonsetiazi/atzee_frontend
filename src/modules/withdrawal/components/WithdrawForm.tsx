// src/modules/withdrawal/components/WithdrawForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { createWithdrawal } from "../services/withdraw.service";
import { formatValue } from "@/shared/utils/formatValue";
import { BankSelector } from "@/modules/account/bank";
import { eventBus } from "@/core/event/event.bus";

export default function WithdrawForm({ onSuccess }: { onSuccess: () => void }) {
    const [amount, setAmount] = useState("");
    const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const numericAmount = Number(amount) || 0;
    const fee = 2500;
    const total = numericAmount + fee;

    const handleSubmit = async () => {
        if (!numericAmount || !selectedBankId) return;

        setLoading(true);

        try {
            await createWithdrawal({
                amount: numericAmount,
                destination_bank_id: selectedBankId,
            });

            // 🔥 SUCCESS EVENT
            eventBus.emit("withdrawal.created", {
                amount: numericAmount,
            });

            setAmount("");
            setSelectedBankId(null);
            onSuccess();
        } catch (err: any) {
            // 🔥 ERROR EVENT
            eventBus.emit("withdrawal.failed", {
                message: err?.message || "Gagal melakukan penarikan",
            });
        } finally {
            setLoading(false);
        }
    };

    const quickAmounts = [50000, 100000, 200000];

    return (
        <div
            className="p-5 space-y-4"
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
                    Tarik Dana
                </h3>
                <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Pilih rekening dan masukkan nominal penarikan
                </p>
            </div>

            {/* 🔥 BANK SELECTOR */}
            <BankSelector value={selectedBankId} onChange={setSelectedBankId} />

            {/* AMOUNT INPUT */}
            <div>
                <label
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Nominal
                </label>
                <div
                    className="mt-1 flex items-center px-4 py-3"
                    style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius)",
                        background: "var(--color-background)",
                    }}
                >
                    <span style={{ color: "var(--text-secondary)" }}>Rp</span>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-full outline-none text-lg font-semibold ml-2 bg-transparent"
                        style={{ color: "var(--text-primary)" }}
                    />
                </div>
            </div>

            {/* QUICK AMOUNT */}
            <div className="flex gap-2 flex-wrap">
                {quickAmounts.map((q) => (
                    <button
                        key={q}
                        onClick={() => setAmount(String(q))}
                        className="
                            px-3 py-2 text-sm rounded-xl 
                            border border-[var(--color-border)]
                            hover:bg-gray-50
                        "
                    >
                        {formatValue(q, { format: "currency" })}
                    </button>
                ))}
            </div>

            {/* SUMMARY */}
            {numericAmount > 0 && (
                <div
                    className="p-3 text-sm"
                    style={{
                        background: "var(--color-surface-alt)",
                        borderRadius: "var(--radius)",
                    }}
                >
                    <div className="flex justify-between">
                        <span>Nominal</span>
                        <span>
                            {formatValue(numericAmount, { format: "currency" })}
                        </span>
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <span>Biaya</span>
                        <span>{formatValue(fee, { format: "currency" })}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                            {formatValue(total, { format: "currency" })}
                        </span>
                    </div>
                </div>
            )}

            {/* BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={!numericAmount || loading}
                className="w-full py-3 font-semibold transition-all"
                style={{
                    borderRadius: "var(--radius)",
                    background: "var(--color-primary)",
                    color: "#fff",
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? "Memproses..." : "Tarik Dana"}
            </button>
        </div>
    );
}
