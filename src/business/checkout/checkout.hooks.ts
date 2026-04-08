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

    return {
        ...state,

        initFromCart: checkoutService.initFromCart,
        initFromBooking: checkoutService.initFromBooking,
        confirmPayment: checkoutService.confirmPayment,
        cancelCurrentBooking: checkoutService.cancelCurrentBooking,
        setAddress: checkoutService.setAddress,
        reset: checkoutService.reset,
        paymentStatus: state.paymentStatus,

        total: state.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        ),
    };
}
