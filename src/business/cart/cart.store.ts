// src/business/cart/cart.store.ts

import { loadFromStorage, saveToStorage } from "@/core/storage/localStorage";
import type { CartItem } from "./cart.types";

type Listener = () => void;

class CartStore {
    private items: CartItem[] = loadFromStorage<CartItem[]>("cart", []);
    private listeners: Listener[] = [];

    getItems() {
        return this.items;
    }

    setItems(items: CartItem[]) {
        this.items = items;
        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emit() {
        saveToStorage("cart", this.items);

        this.listeners.forEach((l) => l());
    }
}

export const cartStore = new CartStore();
