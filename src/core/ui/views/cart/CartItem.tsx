// src/core/ui/views/cart/CartItem.tsx

import type { CartItemType } from "./cart.types";

interface Props {
    item: CartItemType;
    onIncrease?: (id: string) => void;
    onDecrease?: (id: string) => void;
    onRemove?: (id: string) => void;
}

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: Props) {
    return (
        <div
            className="
                flex gap-4 p-4 rounded-xl
                border border-[var(--color-border)]
                bg-[var(--color-surface)]
            "
        >
            {/* Image */}
            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
            )}

            {/* Info */}
            <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString()}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => onDecrease?.(item.id)}
                        className="px-2 py-1 border rounded"
                    >
                        -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() => onIncrease?.(item.id)}
                        className="px-2 py-1 border rounded"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Remove */}
            <button
                onClick={() => onRemove?.(item.id)}
                className="text-red-500 text-sm"
            >
                Hapus
            </button>
        </div>
    );
}
