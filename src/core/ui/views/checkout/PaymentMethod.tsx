// src/core/ui/views/checkout/PaymentMethod.tsx

import type { PaymentMethodType } from "./checkout.types";

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
                        <button
                            key={method.id}
                            onClick={() => onSelect(method.id)}
                            className={`
                                w-full text-left p-3 rounded-xl border
                                ${
                                    isSelected
                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                        : "border-[var(--color-border)]"
                                }
                            `}
                        >
                            {method.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
