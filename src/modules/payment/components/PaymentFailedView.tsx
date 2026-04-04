// src/modules/payment/components/PaymentFailedView.tsx

export default function PaymentFailedView({
    onRetry,
}: {
    onRetry: () => void;
}) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="text-3xl text-red-600">✖</div>
                <h2 className="text-xl font-bold">Pembayaran Gagal</h2>
                <p className="text-sm text-[var(--text-muted)]">
                    Silakan coba lagi.
                </p>

                <button
                    onClick={onRetry}
                    className="mt-4 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl"
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    );
}
