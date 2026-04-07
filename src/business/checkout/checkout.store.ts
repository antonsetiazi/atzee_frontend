// src/business/checkout/checkout.store.ts

import type { CheckoutState } from "./checkout.types";

type Listener = () => void;

class CheckoutStore {
    private state: CheckoutState = {
        items: [],
        bookingId: null,
        paymentStatus: "idle",

        selectedPartnerId: null,
        selectedPartner: null,

        addressId: null,
        selectedAddress: null,
    };

    private listeners: Listener[] = [];

    getState() {
        return this.state;
    }

    setState(partial: Partial<CheckoutState>) {
        this.state = { ...this.state, ...partial };
        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emit() {
        this.listeners.forEach((l) => l());
    }
}

export const checkoutStore = new CheckoutStore();
