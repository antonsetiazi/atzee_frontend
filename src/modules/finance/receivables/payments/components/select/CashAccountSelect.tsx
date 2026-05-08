// src/modules/finance/receivables/payments/components/select/CashAccountSelect.tsx

import { useEffect, useState } from "react";

import { getCashAccounts } from "../../services/payment.service";
import { inputBase } from "@/core/ui/class/field.ui.class";

type CashAccount = {
    id: string;
    name: string;
    account_number: string;
};

type Props = {
    value?: string;

    onChange: (value: string) => void;
};

export default function CashAccountSelect({ value, onChange }: Props) {
    const [loading, setLoading] = useState(true);

    const [rows, setRows] = useState<CashAccount[]>([]);

    async function loadData() {
        try {
            setLoading(true);

            const data = await getCashAccounts();

            setRows(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <label className="mb-1 block text-sm">Cash / Bank Account</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputBase}`}
            >
                <option value="">Select Account</option>

                {rows.map((row) => (
                    <option key={row.id} value={row.id}>
                        {row.name}

                        {row.account_number &&
                            row.account_number !== "-" &&
                            ` (${row.account_number})`}
                    </option>
                ))}
            </select>

            {loading && <div className="mt-1 text-xs text-gray-500">Loading accounts...</div>}
        </div>
    );
}
