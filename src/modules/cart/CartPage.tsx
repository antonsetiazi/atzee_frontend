// src/app/pages/cart/CartPage.tsx

import CartView from "@/core/ui/views/cart/CartView";
import { useCart } from "@/business/cart/cart.hooks";

export default function CartPage() {
    const { items, increase, decrease, removeItem } = useCart();

    return (
        <CartView
            items={items}
            onIncrease={increase}
            onDecrease={decrease}
            onRemove={removeItem}
            onCheckout={() => {
                console.log("Go to checkout");
            }}
        />
    );
}
