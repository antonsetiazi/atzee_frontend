// src/business/transaction_workspace/components/SubmitBar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

const formatCurrency = (value: number) =>
    "Rp " + Number(value || 0).toLocaleString("id-ID");

export function SubmitBar({
    engine,
    onSubmit,
}: {
    engine: any;
    onSubmit: () => void;
}) {
    const items = engine.state.items || [];

    const subtotal = items.reduce(
        (acc: number, item: any) => acc + item.quantity * item.unit_price,
        0,
    );

    const tax = engine.state.tax || 0;
    const discount = engine.state.discount || 0;

    const total = subtotal + tax - discount;

    const disabled = items.length === 0;

    return (
        <div
            className="sticky bottom-0 mt-10"
            style={{
                background: "var(--color-background)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div
                    className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm"
                    style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    {/* Summary */}
                    <div className="space-y-2">
                        <div
                            className="flex justify-between text-sm"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>

                        {tax > 0 && (
                            <div
                                className="flex justify-between text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span>Tax</span>
                                <span>{formatCurrency(tax)}</span>
                            </div>
                        )}

                        {discount > 0 && (
                            <div
                                className="flex justify-between text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span>Discount</span>
                                <span>- {formatCurrency(discount)}</span>
                            </div>
                        )}

                        <div
                            className="flex justify-between text-xl font-semibold pt-2"
                            style={{ color: "var(--text-primary)" }}
                        >
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={onSubmit}
                        disabled={disabled}
                        className="px-10 py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50"
                        style={{
                            background: disabled
                                ? "var(--color-surface-alt)"
                                : "var(--color-primary)",
                            color: disabled ? "var(--text-secondary)" : "white",
                        }}
                    >
                        {disabled ? "Tambahkan Produk" : "Submit Transaction"}
                    </button>
                </div>
            </div>
        </div>
    );
}
