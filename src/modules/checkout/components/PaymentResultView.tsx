// src/modules/checkout/components/PaymentResultView.tsx

import type { PaymentStatus } from "@/business/checkout/checkout.types";

interface Props {
    status: PaymentStatus;
    onBackHome: () => void;
}

export default function PaymentResultView({ status, onBackHome }: Props) {
    const config = {
        paid: {
            title: "Pembayaran Berhasil 🎉",
            description:
                "Pesanan kamu sudah dikonfirmasi. Silakan tunggu proses selanjutnya.",
            color: "text-green-600",
            icon: "✔",
        },
        pending: {
            title: "Menunggu Pembayaran",
            description:
                "Silakan selesaikan pembayaran untuk melanjutkan pesanan.",
            color: "text-yellow-600",
            icon: "⏳",
        },
        failed: {
            title: "Pembayaran Gagal",
            description:
                "Terjadi kesalahan saat pembayaran. Silakan coba lagi.",
            color: "text-red-600",
            icon: "✖",
        },
        idle: {
            title: "",
            description: "",
            color: "",
            icon: "",
        },
    };

    const current = config[status];

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div
                className="
                    max-w-md w-full text-center space-y-6
                    p-6 rounded-2xl
                    border border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    shadow
                "
            >
                {/* ICON */}
                <div
                    className={`
                        mx-auto w-16 h-16 flex items-center justify-center
                        rounded-full text-2xl font-bold
                        ${current.color} bg-opacity-10
                    `}
                >
                    {current.icon}
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-bold">{current.title}</h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-[var(--text-muted)]">
                    {current.description}
                </p>

                {/* ACTIONS */}
                <div className="space-y-3 pt-2">
                    {status === "paid" && (
                        <button
                            className="
                                w-full py-3 rounded-xl
                                bg-[var(--color-primary)]
                                text-white font-semibold
                                hover:opacity-90 transition
                            "
                            onClick={onBackHome}
                        >
                            Lihat Pesanan
                        </button>
                    )}

                    {status === "failed" && (
                        <button
                            className="
                                w-full py-3 rounded-xl
                                bg-[var(--color-primary)]
                                text-white font-semibold
                                hover:opacity-90 transition
                            "
                            onClick={() => window.location.reload()}
                        >
                            Coba Lagi
                        </button>
                    )}

                    {status === "pending" && (
                        <button
                            className="
                                w-full py-3 rounded-xl
                                border border-[var(--color-border)]
                            "
                            onClick={onBackHome}
                        >
                            Kembali
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
