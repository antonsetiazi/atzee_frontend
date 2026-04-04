// src/modules/checkout/components/PaymentMethod.tsx

import type { PaymentMethodType } from "@/business/checkout/checkout.types";

interface Props {
    methods: PaymentMethodType[];

    selectedMethodId: string | null;
    onSelect: (id: string) => void;
}

export default function PaymentMethod({
    methods,
    selectedMethodId,
    onSelect,
}: Props) {
    return (
        <div
            className="
                p-4 rounded-2xl space-y-3
                border border-[var(--color-border)]
                bg-[var(--color-surface)]
                shadow-[var(--shadow)]
            "
        >
            <h2 className="font-semibold text-lg">Metode Pembayaran</h2>

            <div className="space-y-2">
                {methods.map((method) => {
                    const isSelected = method.id === selectedMethodId;

                    return (
                        <div
                            key={method.id}
                            onClick={() => onSelect(method.id)}
                            className={`
                                cursor-pointer p-4 rounded-xl border transition
                                flex justify-between items-center
                                ${
                                    isSelected
                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                        : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
                                }
                            `}
                        >
                            <span>{method.label}</span>

                            <div
                                className={`
                                    w-5 h-5 rounded-full border flex items-center justify-center
                                    ${
                                        isSelected
                                            ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                                            : ""
                                    }
                                `}
                            >
                                {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
