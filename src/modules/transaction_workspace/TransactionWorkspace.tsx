// src/modules/transaction_workspace/TransactionWorkspace.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "@/core/http/http.client";
import { useTransactionEngine } from "./hooks/useTransactionEngine";
import { HeaderSection } from "./components/HeaderSection";
import { ProductSelector } from "./components/ProductSelector";
import { ItemList } from "./components/ItemList";
import { TotalsPanel } from "./components/TotalsPanel";
import { SubmitBar } from "./components/SubmitBar";

export function TransactionWorkspace({
    block,
    pageData,
}: {
    block: any;
    pageData: any;
}) {
    const products = pageData?.products ?? [];

    const engine = useTransactionEngine(
        block.config.transaction_type,
        block.config.subtype,
    );

    const handleSubmit = async () => {
        const payload = engine.buildPayload();
        console.log(payload);
        await httpPost(block.submit_to, payload);
    };

    if (!products.length) {
        return <div>No products available</div>;
    }

    return (
        <div
            className="min-h-screen px-6 py-10"
            style={{
                background: "var(--color-background)",
            }}
        >
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Page Title */}
                <div>
                    <h2
                        className="text-3xl font-semibold tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {block.title}
                    </h2>
                    <p
                        className="mt-2 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Kelola transaksi dan tambahkan produk dengan cepat.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <HeaderSection engine={engine} />

                        <ProductSelector engine={engine} products={products} />

                        <ItemList engine={engine} />
                    </div>

                    {/* Right Column - Sticky Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <TotalsPanel subtotal={engine.subtotal} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Submit Bar */}
            <SubmitBar engine={engine} onSubmit={handleSubmit} />
        </div>
    );
}
