// src/business/checkout/checkout.hooks.ts

import { useEffect, useState } from "react";
import { checkoutStore } from "./checkout.store";
import { checkoutService } from "./checkout.service";

export function useCheckout() {
    const [state, setState] = useState(checkoutStore.getState());

    useEffect(() => {
        return checkoutStore.subscribe(() => {
            setState({ ...checkoutStore.getState() });
        });
    }, []);

    useEffect(() => {
        if (!state.items.length || !state.selectedPartnerId) return;

        const timeout = setTimeout(() => {
            checkoutService.fetchPreview();
        }, 200);

        return () => clearTimeout(timeout);
    }, [state.items, state.selectedPartnerId, state.addressId]);

    return {
        ...state,

        initFromCart: checkoutService.initFromCart,
        initFromBooking: checkoutService.initFromBooking,
        confirmPayment: checkoutService.confirmPayment,
        cancelCurrentBooking: checkoutService.cancelCurrentBooking,
        setAddress: checkoutService.setAddress,
        reset: checkoutService.reset,
        setPaymentMethod: checkoutService.setPaymentMethod,
        paymentStatus: state.paymentStatus,
        paymentMethod: state.paymentMethod,
        subtotal: state.subtotal,
        total: state.total,
    };
}
