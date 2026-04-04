// src/business/order/order.store.ts

import type { Order } from "./order.types";
import type { OrderStatus } from "./order.types";
import { loadFromStorage, saveToStorage } from "@/core/storage/localStorage";

type Listener = (orders: Order[]) => void;

function deduplicateOrders(orders: Order[]): Order[] {
    const map = new Map<string, Order>();

    for (const o of orders) {
        map.set(o.id, o); // 🔥 last write wins
    }

    return Array.from(map.values());
}

class OrderStore {
    private orders: Order[] = deduplicateOrders(
        loadFromStorage<Order[]>("orders", []),
    );

    private listeners: Listener[] = [];

    getOrders() {
        return this.orders;
    }

    setOrders(orders: Order[]) {
        // 🔥 pastikan tidak ada duplicate dari API
        this.orders = deduplicateOrders(orders);
        this.emit();
    }

    addOrder(order: Order) {
        const exists = this.orders.find((o) => o.id === order.id);

        if (exists) {
            // 🔥 update existing (merge)
            this.orders = this.orders.map((o) =>
                o.id === order.id ? { ...o, ...order } : o,
            );
        } else {
            this.orders = [order, ...this.orders];
        }

        this.emit();
    }

    updateStatus(id: string, status: Order["status"]) {
        this.orders = this.orders.map((o) =>
            o.id === id ? { ...o, status } : o,
        );

        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);

        // 🔥 kirim initial state
        listener(this.orders);

        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    getOrderById(id: string) {
        return this.orders.find((o) => o.id === id);
    }

    completeOrder(orderId: string) {
        const updated = this.getOrders().map((o) =>
            o.id === orderId ? { ...o, status: "completed" as OrderStatus } : o,
        );

        this.setOrders(updated);
    }

    private emit() {
        saveToStorage("orders", this.orders);

        this.listeners.forEach((l) => l(this.orders));
    }
}

export const orderStore = new OrderStore();
