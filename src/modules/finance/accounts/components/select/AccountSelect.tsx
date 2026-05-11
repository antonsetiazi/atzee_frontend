// src/modules/finance/accounts/components/select/AccountSelect.tsx

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Account = {
    id: string;
    code: string;
    name: string;
};

type Props = {
    value: string;
    onChange: (id: string) => void;
    label?: string;
    placeholder?: string;
};

export default function AccountSelect({
    value,
    onChange,
    label = "Account",
    placeholder = "Select Account",
}: Props) {
    const [options, setOptions] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            const res = await httpGet<Account[]>("/accounting/accounts/");
            setOptions(res);
        } catch (err) {
            console.error("Failed to load accounts", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="space-y-1">
            {label && <label className="text-sm text-[var(--text-secondary)]">{label}</label>}

            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputBase}`}
                disabled={loading}
            >
                <option value="">{loading ? "Loading..." : placeholder}</option>

                {options.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                        {acc.code} - {acc.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
