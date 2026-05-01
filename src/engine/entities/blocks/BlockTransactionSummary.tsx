// src/engine/entities/blocks/BlockTransactionSummary.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useMemo } from "react";
import { httpPost } from "@/core/http/http.client";

interface Props {
    block: any;
    formValues?: Record<string, any>;
}

export default function BlockTransactionSummary({ block, formValues }: Props) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const payload = useMemo(() => {
        if (!block.query_params) return {};

        const params: Record<string, any> = {};

        Object.entries(block.query_params).forEach(([key, value]: any) => {
            if (typeof value === "string" && value.startsWith("$form.")) {
                const formKey = value.replace("$form.", "");
                params[key] = formValues?.[formKey];
            } else {
                params[key] = value;
            }
        });

        return params;
    }, [block.query_params, formValues]);

    useEffect(() => {
        if (!block.data_source) return;
        if (!block.bind_to_form) return;

        // 🚫 jangan fetch kalau belum siap
        if (!payload.partner_id || !payload.partner_product_ids?.length) {
            setData(null);
            return;
        }

        let alive = true;

        async function fetchEstimate() {
            setLoading(true);
            try {
                const res = await httpPost(block.data_source, payload);
                if (!alive) return;
                setData(res);
            } catch (err) {
                console.error("Failed to fetch transaction summary:", err);
            } finally {
                if (alive) setLoading(false);
            }
        }

        fetchEstimate();

        return () => {
            alive = false;
        };
    }, [block.data_source, block.bind_to_form, payload]);

    if (!data) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
            {block.title && (
                <h3 className="text-lg font-semibold">{block.title}</h3>
            )}

            {/* Items */}
            {block.show_items && data.items?.length > 0 && (
                <div className="space-y-2">
                    {data.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span>
                                {item.label} {item.qty > 1 && `x${item.qty}`}
                            </span>
                            <span>
                                {formatCurrency(item.total, data.currency)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Adjustments */}
            {block.show_adjustments && data.adjustments?.length > 0 && (
                <div className="space-y-1 border-t pt-2">
                    {data.adjustments.map((adj: any, idx: number) => (
                        <div
                            key={idx}
                            className="flex justify-between text-sm text-gray-600"
                        >
                            <span>{adj.label}</span>
                            <span>
                                {formatCurrency(adj.amount, data.currency)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Totals */}
            <div className="border-t pt-2 space-y-1 text-sm">
                {data.subtotal && (
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>
                            {formatCurrency(data.subtotal, data.currency)}
                        </span>
                    </div>
                )}

                {block.show_tax && data.tax > 0 && (
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{formatCurrency(data.tax, data.currency)}</span>
                    </div>
                )}

                {block.show_discount && data.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>
                            -{formatCurrency(data.discount, data.currency)}
                        </span>
                    </div>
                )}

                {block.show_grand_total && (
                    <div className="flex justify-between font-semibold text-base border-t pt-2">
                        <span>Total</span>
                        <span>
                            {formatCurrency(data.grand_total, data.currency)}
                        </span>
                    </div>
                )}
            </div>

            {loading && (
                <div className="text-xs text-gray-400">
                    Menghitung estimasi...
                </div>
            )}
        </div>
    );
}

/**
 * 🔹 Utility
 */
function formatCurrency(amount: number, currency = "IDR") {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(amount);
}
