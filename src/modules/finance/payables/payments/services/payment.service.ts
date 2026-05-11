// src/modules/finance/payables/payments/services/payment.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";
import type { PayablePayment, PayablePaymentCreatePayload } from "../types/payment.types";

export async function getPayablePayments(params?: { partner?: number | string }) {
    const query = new URLSearchParams();

    if (params?.partner) {
        query.append("partner", String(params.partner));
    }

    const queryString = query.toString();

    return httpGet<PayablePayment[]>(
        `/accounting/payable-payments/${queryString ? `?${queryString}` : ""}`,
    );
}

export async function getPayablePaymentDetail(paymentId: string) {
    return httpGet<PayablePayment>(`/accounting/payable-payments/${paymentId}/`);
}
export async function createPayablePayment(payload: PayablePaymentCreatePayload) {
    return httpPost<PayablePayment>("/accounting/payable-payments/create/", payload);
}

export async function postPayablePayment(paymentId: string) {
    return httpPost(`/accounting/payable-payments/${paymentId}/post/`);
}
