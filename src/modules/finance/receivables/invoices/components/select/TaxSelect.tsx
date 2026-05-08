// src/modules/finance/receivables/invoices/components/select/TaxSelect.tsx

import { useEffect, useState } from "react";

import { httpGet } from "@/core/http/http.client";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Tax = {
    id: string;
    name: string;
    rate: number;
};

export type TaxOption = {
    id: string;
    name: string;
    rate: number;
};

type Props = {
    value: string;
    onChange: (value: string, tax?: TaxOption) => void;
};

export default function TaxSelect({ value, onChange }: Props) {
    const [options, setOptions] = useState<Tax[]>([]);

    useEffect(() => {
        async function load() {
            const res = await httpGet<Tax[]>("/accounting/taxes/");

            setOptions(res);
        }

        load();
    }, []);

    return (
        <div>
            <label className="text-sm">Tax</label>

            <select
                value={value}
                onChange={(e) => {
                    const selectedId = e.target.value;

                    const selectedTax = options.find((t) => t.id === selectedId);

                    onChange(selectedId, selectedTax);
                }}
                className={`${inputBase}`}
            >
                <option value="">No Tax</option>

                {options.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.name} ({t.rate}%)
                    </option>
                ))}
            </select>
        </div>
    );
}
