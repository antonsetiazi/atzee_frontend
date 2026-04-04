// src/business/payment/payment.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPayment } from "./payment.api";
import { paymentStore } from "./payment.store";

import type { StartPaymentPayload, PaymentResponse } from "./payment.types";

export const paymentService = {
    async startPayment(payload: StartPaymentPayload): Promise<PaymentResponse> {
        try {
            paymentStore.setState({
                status: "redirecting",
                error: undefined,
            });

            const res = await createPayment(payload);

            paymentStore.setState({
                orderId: res.order_id,
                paymentUrl: res.payment_url,
                status: "waiting",
            });

            return res;
        } catch (err: any) {
            paymentStore.setState({
                status: "failed",
                error: err.message,
            });

            throw err;
        }
    },
};
