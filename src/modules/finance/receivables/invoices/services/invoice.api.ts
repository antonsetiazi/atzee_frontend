// src/modules/finance/receivables/invoices/services/invoice.api.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type {
    InvoiceCreatePayload,
    ReceivableInvoice,
} from "../types/invoice.types";

const BASE_URL = "/accounting/receivable-invoices";

export async function getInvoices() {
    return httpGet<ReceivableInvoice[]>(`${BASE_URL}/`);
}

export async function createInvoice(payload: InvoiceCreatePayload) {
    return httpPost(`${BASE_URL}/create/`, payload);
}
