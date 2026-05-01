// src/modules/transaction_workspace/components/ProductSelector.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";

const formatCurrency = (value: number) =>
    "Rp " + Number(value || 0).toLocaleString("id-ID");

export interface ProductDTO {
    id: string;
    name: string;
    price: number;
    code?: string;
    product_type: "good" | "service";
}

interface Props {
    engine: any;
    products: ProductDTO[];
}

export function ProductSelector({ engine, products }: Props) {
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [products, search]); // ✅ sekarang tidak ada warning

    return (
        <div
            className="rounded-2xl p-6 space-y-5"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Header */}
            <div>
                <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                >
                    Tambah Produk
                </h3>
                <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Cari dan tambahkan produk ke transaksi
                </p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl px-4 py-2"
                style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-background)",
                    color: "var(--text-primary)",
                }}
            />

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product, idx) => (
                    <div
                        key={idx}
                        onClick={() =>
                            engine.addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                            })
                        }
                        className="cursor-pointer rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]"
                        style={{
                            background: "var(--color-background)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {product.name}
                        </div>

                        <div
                            className="text-sm mt-1"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {formatCurrency(product.price)}
                        </div>

                        <div
                            className="mt-3 text-xs font-medium"
                            style={{ color: "var(--color-primary)" }}
                        >
                            + Tambah
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div
                        className="col-span-2 text-center py-6"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Produk tidak ditemukan
                    </div>
                )}
            </div>
        </div>
    );
}
