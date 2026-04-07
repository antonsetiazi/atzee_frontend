// src/modules/checkout/components/sections/PaymentInfo.tsx

export default function PaymentInfo() {
    return (
        <div className="p-4 rounded-2xl border border-[var(--color-border)] border-dashed bg-[var(--color-surface)]">
            <p className="text-sm text-[var(--text-muted)]">
                💳 Metode pembayaran akan dipilih setelah kamu menekan{" "}
                <b>Bayar Sekarang</b>.
            </p>
        </div>
    );
}
