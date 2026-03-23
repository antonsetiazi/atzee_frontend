// src/business/cart/cart.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cartStore } from "./cart.store";
import type { CartItem } from "./cart.types";
import { eventBus } from "@/core/event/event.bus";

export const cartService = {
    addItem(item: CartItem) {
        const items = cartStore.getItems();
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
            existing.quantity += item.quantity;

            // 🔥 event: quantity updated
            eventBus.emit("cart.item.added", {
                productId: item.id,
                quantity: item.quantity,
            });
        } else {
            items.push({ ...item });

            // 🔥 event: new item added
            eventBus.emit("cart.item.added", {
                productId: item.id,
                quantity: item.quantity,
            });
        }

        cartStore.setItems([...items]);
    },

    removeItem(id: string) {
        const items = cartStore.getItems().filter((i) => i.id !== id);
        cartStore.setItems(items);

        // 🔥 optional event (kalau mau)
        eventBus.emit("cart.item.removed" as any, {
            productId: id,
        });
    },

    increase(id: string) {
        const items = cartStore.getItems();

        const item = items.find((i) => i.id === id);
        if (item) {
            item.quantity += 1;

            eventBus.emit("cart.item.added", {
                productId: id,
                quantity: 1,
            });
        }

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

            // 🔥 optional (kalau mau track)
            eventBus.emit("cart.item.decreased" as any, {
                productId: id,
                quantity: 1,
            });
        }

        cartStore.setItems([...items]);
    },

    clear() {
        cartStore.setItems([]);

        // 🔥 optional
        eventBus.emit("cart.cleared" as any, {});
    },
};
