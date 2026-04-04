// src/modules/payment/api/payment.api.ts

import { httpGet } from "@/core/http/http.client";
import type { PaymentMethod } from "../types/payment.types";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
    return httpGet<PaymentMethod[]>("/payments/methods/");
}
