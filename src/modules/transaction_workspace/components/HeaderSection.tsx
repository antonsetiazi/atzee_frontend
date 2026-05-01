// src/modules/transaction_workspace/components/HeaderSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { inputBase } from "@/core/ui/class/field.ui.class";

export function HeaderSection({ engine }: any) {
    const header = engine.state.header;

    return (
        <div
            className="rounded-2xl p-6 space-y-6"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Title */}
            <div>
                <h3
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                >
                    Informasi Transaksi
                </h3>
                <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Atur tanggal dan catatan transaksi
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Transaction Date */}
                <div className="space-y-2">
                    <label
                        className="text-sm font-medium"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Tanggal Transaksi
                    </label>

                    <input
                        type="date"
                        value={header.transaction_date}
                        onChange={(e) =>
                            engine.dispatch({
                                type: "SET_HEADER",
                                payload: {
                                    transaction_date: e.target.value,
                                },
                            })
                        }
                        className={inputBase}
                    />
                </div>

                {/* Transaction Type (Read Only) */}
                <div className="space-y-2">
                    <label
                        className="text-sm font-medium"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Tipe Transaksi
                    </label>

                    <div
                        className="rounded-xl px-4 py-2 text-sm font-medium"
                        style={{
                            background: "var(--color-surface-alt)",
                            border: "1px solid var(--color-border)",
                            color: "var(--text-primary)",
                        }}
                    >
                        {header.transaction_type}
                        {header.subtype && (
                            <span
                                className="ml-2 text-xs"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                ({header.subtype})
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Catatan
                </label>

                <textarea
                    value={header.notes || ""}
                    placeholder="Tambahkan catatan jika diperlukan..."
                    onChange={(e) =>
                        engine.dispatch({
                            type: "SET_HEADER",
                            payload: { notes: e.target.value },
                        })
                    }
                    className={`${inputBase} min-h-[100px] resize-none`}
                />
            </div>
        </div>
    );
}
