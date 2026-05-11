// src/modules/finance/fixed_assets/components/selectors/AssetCategorySelect.tsx

import { useAssetCategories } from "../../hooks/useAssetCategories";

type Props = {
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    placeholder?: string;
    error?: string;
};

export default function AssetCategorySelect({
    value,
    onChange,
    disabled = false,
    required = false,
    label = "Asset Category",
    placeholder = "Select category",
    error,
}: Props) {
    const { items, loading } = useAssetCategories();

    return (
        <div className="space-y-2">
            <label
                className="text-sm font-medium"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {label}

                {required && (
                    <span
                        className="ml-1"
                        style={{
                            color: "var(--color-error)",
                        }}
                    >
                        *
                    </span>
                )}
            </label>

            <select
                value={value || ""}
                disabled={disabled || loading}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 w-full rounded-xl border px-4 text-sm transition-all outline-none disabled:opacity-60"
                style={{
                    background: "var(--color-background)",
                    borderColor: error ? "var(--color-error)" : "var(--color-border)",
                    color: "var(--text-primary)",
                }}
            >
                <option value="">{loading ? "Loading..." : placeholder}</option>

                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.code} - {item.name}
                    </option>
                ))}
            </select>

            {error && (
                <div
                    className="text-sm"
                    style={{
                        color: "var(--color-error)",
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    );
}
