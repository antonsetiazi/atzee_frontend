// src/modules/finance/receivables/invoices/components/select/CustomerSelect.tsx

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Customer = {
    id: string;
    name: string;
};

type Props = {
    value: string;
    onChange: (id: string) => void;
};

export default function CustomerSelect({ value, onChange }: Props) {
    const [options, setOptions] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            const res = await httpGet<Customer[]>("/business/customers/");

            setOptions(res);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <label className="text-sm">Customer</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputBase}`}
            >
                <option value="">Select Customer</option>

                {options.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {loading && <small>Loading customers...</small>}
        </div>
    );
}
