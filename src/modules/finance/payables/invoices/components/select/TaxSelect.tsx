// src/modules/finance/payables/invoices/components/select/TaxSelect.tsx

import { useEffect, useState } from "react";

import { httpGet } from "@/core/http/http.client";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Tax = {
    id: string;
    name: string;
    rate: number;
};

type Props = {
    value?: string;
    onChange?: (value: string, tax?: Tax | null) => void;
};

export default function TaxSelect({ value, onChange }: Props) {
    const [items, setItems] = useState<Tax[]>([]);

    useEffect(() => {
        async function load() {
            const res = await httpGet<Tax[]>("/accounting/taxes/");

            setItems(res);
        }

        load();
    }, []);

    const selectedTax = items.find((x) => x.id === value) || null;

    return (
        <div>
            <label className="mb-1 block text-sm font-medium">Tax</label>

            <select
                value={value || ""}
                onChange={(e) => {
                    const nextValue = e.target.value;

                    const tax = items.find((x) => x.id === nextValue) || null;

                    onChange?.(nextValue, tax);
                }}
                className={inputBase}
            >
                <option value="">No Tax</option>

                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name} ({item.rate}%)
                    </option>
                ))}
            </select>

            {selectedTax && (
                <div className="mt-1 text-xs text-gray-500">Tax Rate: {selectedTax.rate}%</div>
            )}
        </div>
    );
}
