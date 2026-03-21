// src/core/ui/views/checkout/PaymentResultView.tsx

import PaymentStatusBadge from "./PaymentStatusBadge";
import type { PaymentStatus } from "@/business/checkout/checkout.types";

interface Props {
    status: PaymentStatus;
    onBackHome: () => void;
}

export default function PaymentResultView({ status, onBackHome }: Props) {
    const messages = {
        paid: "Pembayaran berhasil 🎉",
        pending: "Menunggu pembayaran...",
        failed: "Pembayaran gagal ❌",
        idle: "",
    };

    return (
        <div className="max-w-md mx-auto text-center space-y-4">
            <PaymentStatusBadge status={status} />

            <h2 className="text-xl font-semibold">{messages[status]}</h2>

            <button
                onClick={onBackHome}
                className="
                    mt-4 px-4 py-2 rounded-xl
                    bg-[var(--color-primary)]
                    text-white
                "
            >
                Kembali ke Beranda
            </button>
        </div>
    );
}
