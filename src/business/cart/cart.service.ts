// src/business/cart/cart.service.ts

import { cartStore } from "./cart.store";
import type { CartItem } from "./cart.types";

export const cartService = {
    addItem(item: CartItem) {
        const items = cartStore.getItems();
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
            existing.quantity += item.quantity;
        } else {
            items.push({ ...item });
        }

        cartStore.setItems([...items]);
    },

    removeItem(id: string) {
        const items = cartStore.getItems().filter((i) => i.id !== id);
        cartStore.setItems(items);
    },

    increase(id: string) {
        const items = cartStore.getItems();

        const item = items.find((i) => i.id === id);
        if (item) item.quantity += 1;

        cartStore.setItems([...items]);
    },

    decrease(id: string) {
        const items = cartStore.getItems();

        const item = items.find((i) => i.id === id);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                return this.removeItem(id);
            }
        }

        cartStore.setItems([...items]);
    },

    clear() {
        cartStore.setItems([]);
    },
};
