// src/modules/finance/fixed_assets/components/forms/AssetCategoryForm.tsx

import { useMemo, useState } from "react";

import type { AssetCategoryFormData } from "../../types/assetCategory.types";
import AccountSelect from "@/modules/finance/accounts/components/select/AccountSelect";
import { Button } from "@/core/ui/components";

type Props = {
    initialValues?: Partial<AssetCategoryFormData>;
    loading?: boolean;
    onSubmit: (values: AssetCategoryFormData) => Promise<void> | void;
};

export default function AssetCategoryForm({ initialValues, loading = false, onSubmit }: Props) {
    const defaultForm = useMemo<AssetCategoryFormData>(() => {
        return {
            code: initialValues?.code ?? "",
            name: initialValues?.name ?? "",
            description: initialValues?.description ?? "",
            depreciation_method: initialValues?.depreciation_method ?? "straight_line",
            useful_life_months: initialValues?.useful_life_months ?? 12,
            asset_account_id: initialValues?.asset_account_id ?? "",
            accumulated_depreciation_account_id:
                initialValues?.accumulated_depreciation_account_id ?? "",
            depreciation_expense_account_id: initialValues?.depreciation_expense_account_id ?? "",
            is_active: initialValues?.is_active ?? true,
        };
    }, [initialValues]);

    const [form, setForm] = useState<AssetCategoryFormData>(defaultForm);

    const formKey = initialValues?.code || "create";

    const [activeKey, setActiveKey] = useState(formKey);

    if (formKey !== activeKey) {
        setActiveKey(formKey);
        setForm(defaultForm);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="Code"
                    value={form.code}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            code: value,
                        })
                    }
                />

                <Input
                    label="Name"
                    value={form.name}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            name: value,
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
                    label="Depreciation Method"
                    value={form.depreciation_method}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            depreciation_method: value,
                        })
                    }
                />

                <AccountSelect
                    label="Asset Account"
                    value={form.asset_account_id}
                    onChange={(v) => setForm({ ...form, asset_account_id: v })}
                />

                <AccountSelect
                    label="Accumulated Depreciation Account ID"
                    value={form.accumulated_depreciation_account_id}
                    onChange={(v) => setForm({ ...form, accumulated_depreciation_account_id: v })}
                />

                <AccountSelect
                    label="Depreciation Expense Account ID"
                    value={form.depreciation_expense_account_id}
                    onChange={(v) => setForm({ ...form, depreciation_expense_account_id: v })}
                />
            </div>

            <Textarea
                label="Description"
                value={form.description || ""}
                onChange={(value) =>
                    setForm({
                        ...form,
                        description: value,
                    })
                }
            />

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Category"}
            </Button>
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
