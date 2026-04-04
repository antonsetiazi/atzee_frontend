// src/modules/payment/components/PaymentLoadingView.tsx

export default function PaymentLoadingView() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="text-3xl">⏳</div>
                <h2 className="text-xl font-bold">Menunggu Pembayaran</h2>
                <p className="text-sm text-[var(--text-muted)]">
                    Kami sedang memverifikasi pembayaran kamu...
                </p>
            </div>
        </div>
    );
}
