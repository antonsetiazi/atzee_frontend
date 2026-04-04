// src/business/payment/payment.store.ts

import type { PaymentState } from "./payment.types";

type Listener = () => void;

const state: PaymentState = {
    orderId: null,
    paymentUrl: undefined,
    status: "idle",
};

const listeners = new Set<Listener>();

function setState(partial: Partial<PaymentState>) {
    Object.assign(state, partial);
    listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getState(): PaymentState {
    return state;
}

export const paymentStore = {
    getState,
    setState,
    subscribe,
};
