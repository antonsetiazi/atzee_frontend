// src/business/order/order.store.ts

import type { Order } from "./order.types";
import { loadFromStorage, saveToStorage } from "@/core/storage/localStorage";

type Listener = (orders: Order[]) => void;

class OrderStore {
    private orders: Order[] = loadFromStorage<Order[]>("orders", []);

    private listeners: Listener[] = [];

    getOrders() {
        return this.orders;
    }

    addOrder(order: Order) {
        this.orders = [order, ...this.orders];
        this.emit();
    }

    updateStatus(id: string, status: Order["status"]) {
        const order = this.orders.find((o) => o.id === id);
        if (order) {
            order.status = status;
            this.emit();
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);

        // 🔥 langsung kirim data awal
        listener(this.orders);

        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    getOrderById(id: string) {
        return this.orders.find((o) => o.id === id);
    }

    private emit() {
        saveToStorage("orders", this.orders);

        this.listeners.forEach((l) => l(this.orders));
    }
}

export const orderStore = new OrderStore();
