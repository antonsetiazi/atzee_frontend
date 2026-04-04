// src/core/payment/useSnapPayment.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { loadSnapScript } from "./snapLoader";
import type { SnapCallbacks } from "./payment.types";

declare global {
    interface Window {
        snap: any;
    }
}

type UseSnapPaymentOptions = {
    clientKey: string;
};

export function useSnapPayment({ clientKey }: UseSnapPaymentOptions) {
    const [loading, setLoading] = useState(false);

    const pay = async (paymentToken: string, callbacks?: SnapCallbacks) => {
        try {
            setLoading(true);

            // 🔥 load snap script
            await loadSnapScript(clientKey);

            if (!window.snap) {
                throw new Error("Snap not available");
            }

            // 🔥 open popup
            window.snap.pay(paymentToken, {
                onSuccess: (result: any) => {
                    callbacks?.onSuccess?.(result);
                },
                onPending: (result: any) => {
                    callbacks?.onPending?.(result);
                },
                onError: (result: any) => {
                    callbacks?.onError?.(result);
                },
                onClose: () => {
                    callbacks?.onClose?.();
                },
            });
        } catch (err) {
            console.error("Snap payment error:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        pay,
        loading,
    };
}
