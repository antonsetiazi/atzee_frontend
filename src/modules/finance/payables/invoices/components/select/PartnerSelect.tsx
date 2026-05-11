// src/modules/finance/payables/invoices/components/select/PartnerSelect.tsx

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Partner = {
    id: string;
    name: string;
};

type Props = {
    value: string;
    onChange: (value: string, partner?: Partner | null) => void;
};

export default function PartnerSelect({ value, onChange }: Props) {
    const [loading, setLoading] = useState(true);

    const [partners, setPartners] = useState<Partner[]>([]);

    async function loadPartners() {
        try {
            setLoading(true);

            const data = await httpGet<Partner[]>("/business/partners/");

            setPartners(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPartners();
    }, []);

    return (
        <div>
            <label
                className="mb-1 block text-sm font-medium"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                Vendor / Partner
            </label>

            <select
                value={value}
                onChange={(e) => {
                    const selected = partners.find((p) => p.id === e.target.value);

                    onChange(e.target.value, selected || null);
                }}
                disabled={loading}
                className={inputBase}
            >
                <option value="">{loading ? "Loading vendors..." : "Select vendor"}</option>

                {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                        {partner.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
