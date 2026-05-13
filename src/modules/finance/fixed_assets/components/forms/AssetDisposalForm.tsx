// src/modules/finance/fixed_assets/components/forms/AssetDisposalForm.tsx

import { useState } from "react";

import type { AssetDisposalFormData } from "../../types/disposal.types";

type Props = {
    assetId: string;
    loading?: boolean;

    onSubmit: (values: AssetDisposalFormData) => Promise<void> | void;
};

export default function AssetDisposalForm({ assetId, loading = false, onSubmit }: Props) {
    const [form, setForm] = useState<AssetDisposalFormData>({
        asset_id: assetId,
        disposal_date: "",
        disposal_value: 0,
        notes: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div>
                <div
                    className="text-lg font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    Dispose Asset
                </div>

                <div
                    className="mt-1 text-sm"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Record asset disposal and generate accounting journal automatically.
                </div>
            </div>

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    type="date"
                    label="Disposal Date"
                    value={form.disposal_date}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            disposal_date: value,
                        })
                    }
                />

                <Input
                    type="number"
                    label="Disposal Value"
                    value={String(form.disposal_value)}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            disposal_value: Number(value),
                        })
                    }
                />
            </div>

            <Textarea
                label="Notes"
                value={form.notes || ""}
                onChange={(value) =>
                    setForm({
                        ...form,
                        notes: value,
                    })
                }
            />

            {/* ================================================= */}
            {/* ACTION */}
            {/* ================================================= */}

            <div className="flex items-center justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="h-11 rounded-xl px-6 text-sm font-medium text-white transition-all disabled:opacity-60"
                    style={{
                        background: "#dc2626",
                    }}
                >
                    {loading ? "Processing..." : "Dispose Asset"}
                </button>
            </div>
        </form>
    );
}

/* =========================================================
    INTERNAL COMPONENTS
========================================================= */

type InputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
};

function Input({ label, value, onChange, type = "text" }: InputProps) {
    return (
        <div className="space-y-2">
            <label
                className="text-sm font-medium"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 w-full rounded-xl border px-4 text-sm outline-none"
                style={{
                    background: "var(--color-background)",

                    borderColor: "var(--color-border)",

                    color: "var(--text-primary)",
                }}
            />
        </div>
    );
}

type TextareaProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function Textarea({ label, value, onChange }: TextareaProps) {
    return (
        <div className="space-y-2">
            <label
                className="text-sm font-medium"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {label}
            </label>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border p-4 text-sm outline-none"
                style={{
                    background: "var(--color-background)",

                    borderColor: "var(--color-border)",

                    color: "var(--text-primary)",
                }}
            />
        </div>
    );
}
