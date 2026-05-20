// src/module/account/bank/components/BankSelector.tsx

import { useEffect } from "react";
import { useBanks } from "../hooks/useBanks";
import BankCard from "./BankCard";
import BankEmptyState from "./BankEmptyState";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { LoadingState } from "@/core/ui/components";

export default function BankSelector({
    value,
    onChange,
}: {
    value: string | null;
    onChange: (id: string) => void;
}) {
    const { data, loading } = useBanks();

    useEffect(() => {
        if (value) return;

        if (data.length > 0) {
            const defaultBank = data.find((b) => b.is_default);
            if (defaultBank) {
                onChange(defaultBank.id);
            }
        }
    }, [data, value, onChange]);

    if (loading) return <LoadingState />;

    if (data.length === 0) {
        return <BankEmptyState onAdd={() => SmartNavigate.go("/account/bank")} />;
    }

    return (
        <div className="space-y-2">
            <div className="text-sm font-medium">Pilih Rekening</div>

            {data.map((bank) => (
                <div
                    key={bank.id}
                    onClick={() => onChange(bank.id)}
                    style={{
                        border:
                            value === bank.id
                                ? "2px solid var(--color-primary)"
                                : "1px solid var(--color-border)",
                        borderRadius: "var(--radius)",
                    }}
                >
                    <BankCard bank={bank} />
                </div>
            ))}
        </div>
    );
}
