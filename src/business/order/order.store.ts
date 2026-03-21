// src/business/order/order.store.ts

import type { Order } from "./order.types";

type Listener = () => void;

class OrderStore {
    private orders: Order[] = [];

    private listeners: Listener[] = [];

    getOrders() {
        return this.orders;
    }

    addOrder(order: Order) {
        this.orders = [order, ...this.orders];
        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    getOrderById(id: string) {
        return this.orders.find((o) => o.id === id);
    }

    private emit() {
        this.listeners.forEach((l) => l());
    }
}

export const orderStore = new OrderStore();
