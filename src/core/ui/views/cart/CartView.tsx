// src/core/ui/views/cart/CartView.tsx

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import type { CartItemType } from "./cart.types";

interface Props {
    items: CartItemType[];

    onIncrease?: (id: string) => void;
    onDecrease?: (id: string) => void;
    onRemove?: (id: string) => void;

    onCheckout?: () => void;
}

export default function CartView({
    items,
    onIncrease,
    onDecrease,
    onRemove,
    onCheckout,
}: Props) {
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT: Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            Keranjang kosong
                        </div>
                    ) : (
                        items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={onIncrease}
                                onDecrease={onDecrease}
                                onRemove={onRemove}
                            />
                        ))
                    )}
                </div>

                {/* RIGHT: Summary */}
                <div className="space-y-4">
                    <CartSummary items={items} />

                    <button
                        onClick={onCheckout}
                        disabled={items.length === 0}
                        className="
                        w-full py-3 rounded-xl
                        bg-[var(--color-primary)]
                        text-white font-semibold
                        shadow-[var(--shadow)]
                        hover:opacity-90 transition
                        disabled:opacity-50
                    "
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
