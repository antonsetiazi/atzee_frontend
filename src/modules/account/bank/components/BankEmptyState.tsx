// src/module/account/bank/components/BankEmptyState.tsx

export default function BankEmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div
            className="py-12 px-6 text-center"
            style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius)",
                border: "1px dashed var(--color-border)",
            }}
        >
            {/* ICON */}
            <div
                className="mx-auto mb-4 flex items-center justify-center"
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--color-surface-alt)",
                }}
            >
                <span style={{ fontSize: 28 }}>🏦</span>
            </div>

            {/* TITLE */}
            <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
            >
                Belum ada rekening
            </h3>

            {/* DESCRIPTION */}
            <p
                className="text-sm mb-5"
                style={{ color: "var(--text-secondary)" }}
            >
                Tambahkan rekening bank untuk mulai menarik saldo Anda
            </p>

            {/* ACTION */}
            <button
                onClick={onAdd}
                className="px-5 py-3 font-semibold transition-all"
                style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow)",
                }}
            >
                + Tambah Rekening
            </button>
        </div>
    );
}
