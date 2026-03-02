// src/business/transaction_workspace/components/TotalsPanel.tsx

interface TotalsPanelProps {
    subtotal: number;
    tax?: number;
    discount?: number;
}

const formatCurrency = (value: number) =>
    "Rp " + Number(value || 0).toLocaleString("id-ID");

export function TotalsPanel({
    subtotal,
    tax = 0,
    discount = 0,
}: TotalsPanelProps) {
    const total = subtotal + tax - discount;

    return (
        <div
            className="rounded-2xl p-6 space-y-4"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Title */}
            <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                Ringkasan Transaksi
            </h3>

            {/* Breakdown */}
            <div className="space-y-2 text-sm">
                <div
                    className="flex justify-between"
                    style={{ color: "var(--text-secondary)" }}
                >
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>

                {tax > 0 && (
                    <div
                        className="flex justify-between"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <span>Tax</span>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                )}

                {discount > 0 && (
                    <div
                        className="flex justify-between"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <span>Discount</span>
                        <span>- {formatCurrency(discount)}</span>
                    </div>
                )}
            </div>

            {/* Divider */}
            <div
                style={{
                    borderTop: "1px solid var(--color-border)",
                }}
            />

            {/* Grand Total */}
            <div
                className="flex justify-between text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
        </div>
    );
}
