// src/module/account/bank/components/BankCard.tsx

import type { BankAccount } from "../types/bank.types";

function maskAccountNumber(num: string) {
    if (num.length < 4) return num;
    return "****" + num.slice(-4);
}

export default function BankCard({
    bank,
    onClick,
}: {
    bank: BankAccount;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="p-4 cursor-pointer"
            style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                background: "var(--color-surface)",
            }}
        >
            <div className="flex justify-between items-center">
                <div>
                    <div className="font-semibold">{bank.bank_name}</div>
                    <div className="text-sm text-gray-500">
                        {maskAccountNumber(bank.account_number)}
                    </div>
                    <div className="text-sm">{bank.account_name}</div>
                </div>

                {bank.is_default && (
                    <span className="text-xs text-green-600 font-medium">
                        Default
                    </span>
                )}
            </div>
        </div>
    );
}
