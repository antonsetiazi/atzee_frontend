// src/business/payment/payment.service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPayment } from "./payment.api";
import { paymentStore } from "./payment.store";

import type {
    StartPaymentPayload,
    PaymentResponse,
    PaymentExecution,
} from "./payment.types";

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
    async startPaymentExecution(
        payload: StartPaymentPayload,
    ): Promise<PaymentExecution> {
        const res = await this.startPayment(payload);

        // 🔥 mapping (NON-BREAKING)
        if (res.payment_token) {
            return {
                payment_id: res.order_id,
                type: "popup",
                payload: {
                    token: res.payment_token,
                },
            };
        }

        if (res.payment_url) {
            return {
                payment_id: res.order_id,
                type: "redirect",
                payload: {
                    url: res.payment_url,
                },
            };
        }

        // fallback (future)
        return {
            payment_id: res.order_id,
            type: "instruction",
            payload: {
                data: res,
            },
        };
    },
};
