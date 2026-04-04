// src/modules/payment/components/PaymentSuccessView.tsx

export default function PaymentSuccessView({ onDone }: { onDone: () => void }) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="text-3xl text-green-600">✔</div>
                <h2 className="text-xl font-bold">Pembayaran Berhasil</h2>
                <p className="text-sm text-[var(--text-muted)]">
                    Pesanan kamu sudah dikonfirmasi.
                </p>

                <button
                    onClick={onDone}
                    className="mt-4 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl"
                >
                    Lihat Pesanan
                </button>
            </div>
        </div>
    );
}
