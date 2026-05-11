// src/modules/finance/fixed_assets/components/forms/FixedAssetForm.tsx

import { useState } from "react";
import AssetCategorySelect from "../selectors/AssetCategorySelect";
import type { FixedAssetFormData } from "../../types/fixedAsset.types";

type Props = {
    initialValues?: Partial<FixedAssetFormData>;
    loading?: boolean;
    onSubmit: (values: FixedAssetFormData) => Promise<void> | void;
};

export default function FixedAssetForm({ initialValues, loading = false, onSubmit }: Props) {
    const [form, setForm] = useState<FixedAssetFormData>({
        asset_number: initialValues?.asset_number || "",
        name: initialValues?.name || "",
        category_id: initialValues?.category_id || "",
        purchase_date: initialValues?.purchase_date || "",
        acquisition_cost: initialValues?.acquisition_cost || 0,
        salvage_value: initialValues?.salvage_value || 0,
        useful_life_months: initialValues?.useful_life_months || 12,
        depreciation_method: initialValues?.depreciation_method || "straight_line",
        depreciation_start_date: initialValues?.depreciation_start_date || "",
        serial_number: initialValues?.serial_number || "",
        location: initialValues?.location || "",
        notes: initialValues?.notes || "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="Asset Number"
                    value={form.asset_number}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            asset_number: value,
                        })
                    }
                />

                <Input
                    label="Asset Name"
                    value={form.name}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            name: value,
                        })
                    }
                />

                <AssetCategorySelect
                    value={form.category_id}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            category_id: value,
                        })
                    }
                />

                <Input
                    type="date"
                    label="Purchase Date"
                    value={form.purchase_date}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            purchase_date: value,
                        })
                    }
                />

                <Input
                    type="number"
                    label="Acquisition Cost"
                    value={String(form.acquisition_cost)}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            acquisition_cost: Number(value),
                        })
                    }
                />

                <Input
                    type="number"
                    label="Salvage Value"
                    value={String(form.salvage_value)}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            salvage_value: Number(value),
                        })
                    }
                />

                <Input
                    type="number"
                    label="Useful Life (Months)"
                    value={String(form.useful_life_months)}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            useful_life_months: Number(value),
                        })
                    }
                />

                <Input
                    type="date"
                    label="Depreciation Start Date"
                    value={form.depreciation_start_date}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            depreciation_start_date: value,
                        })
                    }
                />

                <Input
                    label="Serial Number"
                    value={form.serial_number || ""}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            serial_number: value,
                        })
                    }
                />

                <Input
                    label="Location"
                    value={form.location || ""}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            location: value,
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
                className="h-11 rounded-xl px-6 text-sm font-medium transition-all disabled:opacity-60"
                style={{
                    background: "var(--color-primary)",

                    color: "#fff",
                }}
            >
                {loading ? "Saving..." : "Save Asset"}
            </button>
        </form>
    );
}

// ======================================================
// INTERNAL COMPONENTS
// ======================================================

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
