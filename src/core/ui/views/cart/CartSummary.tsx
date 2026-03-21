// src/core/ui/views/cart/CartSummary.tsx

import type { CartItemType } from "./cart.types";

interface Props {
    items: CartItemType[];
}

export default function CartSummary({ items }: Props) {
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <div
            className="
                p-4 rounded-xl
                border border-[var(--color-border)]
                bg-[var(--color-surface)]
            "
        >
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rp {subtotal.toLocaleString()}</span>
            </div>
        </div>
    );
}
