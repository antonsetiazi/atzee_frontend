// src/business/transaction_workspace/components/ItemList.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

const formatCurrency = (value: number) =>
    "Rp " + Number(value || 0).toLocaleString("id-ID");

export function ItemList({ engine }: any) {
    const items = engine.state.items;

    if (!items.length) {
        return (
            <div
                className="rounded-2xl p-8 text-center"
                style={{
                    background: "var(--color-surface)",
                    border: "1px dashed var(--color-border)",
                    color: "var(--text-secondary)",
                }}
            >
                Belum ada produk ditambahkan
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Header */}
            <div
                className="grid grid-cols-12 px-6 py-4 text-sm font-medium"
                style={{
                    borderBottom: "1px solid var(--color-border)",
                    color: "var(--text-secondary)",
                }}
            >
                <div className="col-span-4">Produk</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Harga</div>
                <div className="col-span-3 text-right">Subtotal</div>
                <div className="col-span-1 text-center"></div>
            </div>

            {/* Items */}
            {items.map((item: any) => {
                const subtotal = item.quantity * item.unit_price;

                return (
                    <div
                        key={item.id}
                        className="grid grid-cols-12 items-center px-6 py-4 transition-all duration-200 hover:bg-[var(--color-surface-alt)]"
                        style={{
                            borderBottom: "1px solid var(--color-border)",
                        }}
                    >
                        {/* Name */}
                        <div
                            className="col-span-4 font-medium"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {item.name}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                            <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) =>
                                    engine.dispatch({
                                        type: "UPDATE_QTY",
                                        payload: {
                                            id: item.id,
                                            qty: Number(e.target.value),
                                        },
                                    })
                                }
                                className="w-20 text-center rounded-lg px-2 py-1"
                                style={{
                                    border: "1px solid var(--color-border)",
                                    background: "var(--color-background)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-2 flex justify-end">
                            <input
                                type="number"
                                min={0}
                                value={item.unit_price}
                                onChange={(e) =>
                                    engine.dispatch({
                                        type: "UPDATE_PRICE",
                                        payload: {
                                            id: item.id,
                                            price: Number(e.target.value),
                                        },
                                    })
                                }
                                className="w-28 text-right rounded-lg px-2 py-1"
                                style={{
                                    border: "1px solid var(--color-border)",
                                    background: "var(--color-background)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>

                        {/* Subtotal */}
                        <div
                            className="col-span-3 text-right font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {formatCurrency(subtotal)}
                        </div>

                        {/* Remove */}
                        <div className="col-span-1 flex justify-center">
                            <button
                                onClick={() =>
                                    engine.dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: item.id,
                                    })
                                }
                                className="text-sm px-3 py-1 rounded-lg transition"
                                style={{
                                    color: "var(--color-danger)",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
