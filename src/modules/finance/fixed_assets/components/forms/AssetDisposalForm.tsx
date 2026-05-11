// src/modules/finance/fixed_assets/components/forms/AssetDisposalForm.tsx

import { useState } from "react";
import type { AssetDisposalFormData } from "../../types/disposal.types";

type Props = {
    loading?: boolean;
    onSubmit: (values: AssetDisposalFormData) => Promise<void> | void;
};

export default function AssetDisposalForm({ loading = false, onSubmit }: Props) {
    const [form, setForm] = useState<AssetDisposalFormData>({
        asset_id: "",
        disposal_date: "",
        disposal_type: "sale",
        selling_price: 0,
        notes: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="Asset ID"
                    value={form.asset_id}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            asset_id: value,
                        })
                    }
                />

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
                    label="Disposal Type"
                    value={form.disposal_type}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            disposal_type: value,
                        })
                    }
                />

                <Input
                    type="number"
                    label="Selling Price"
                    value={String(form.selling_price)}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            selling_price: Number(value),
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

            <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-xl px-6 text-sm font-medium"
                style={{
                    background: "var(--color-primary)",

                    color: "#fff",
                }}
            >
                {loading ? "Processing..." : "Submit Disposal"}
            </button>
        </form>
    );
}

function Input({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
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

function Textarea({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
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
                rows={5}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border p-4 text-sm outline-none"
                style={{
                    background: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--text-primary)",
                }}
            />
        </div>
    );
}
