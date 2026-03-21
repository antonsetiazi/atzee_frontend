// src/business/cart/cart.hooks.ts

import { useEffect, useState } from "react";
import { cartStore } from "./cart.store";
import { cartService } from "./cart.service";
import type { CartItem } from "./cart.types";

export function useCart() {
    const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

    useEffect(() => {
        return cartStore.subscribe(() => {
            setItems([...cartStore.getItems()]);
        });
    }, []);

    return {
        items,

        addItem: cartService.addItem,
        removeItem: cartService.removeItem,
        increase: cartService.increase,
        decrease: cartService.decrease,
        clear: cartService.clear,

        total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
}
