// src/core/scanner/scanner.smart.ts

export type ScanAction =
    | { type: "invoice"; id: string }
    | { type: "product"; sku: string }
    | { type: "booking"; code: string }
    | { type: "url"; url: string }
    | { type: "qris"; raw: string }
    | { type: "unknown"; raw: string };

export function parseScan(raw: string): ScanAction {
    const text = raw.trim();

    if (text.startsWith("INV-")) {
        return { type: "invoice", id: text };
    }

    if (text.startsWith("SKU-")) {
        return { type: "product", sku: text };
    }

    if (text.startsWith("BOOK-")) {
        return { type: "booking", code: text };
    }

    if (text.startsWith("http://") || text.startsWith("https://")) {
        return { type: "url", url: text };
    }

    if (text.startsWith("000201")) {
        return { type: "qris", raw: text };
    }

    return { type: "unknown", raw: text };
}
