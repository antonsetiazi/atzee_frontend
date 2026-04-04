// src/modules/checkout/hooks/useCheckout.ts

import { useCheckout as useCheckoutCore } from "@/business/checkout/checkout.hooks";

export function useCheckout() {
    return useCheckoutCore();
}
