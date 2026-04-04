// src/business/payment/payment.api.ts

import { httpPost } from "@/core/http/http.client";
import type { PaymentResponse } from "./payment.types";

export interface CreatePaymentPayload {
    order_id: string;
    payment_method: string;
}

export async function createPayment(
    payload: CreatePaymentPayload,
): Promise<PaymentResponse> {
    return httpPost<PaymentResponse>("/payments/create/", payload);
}
