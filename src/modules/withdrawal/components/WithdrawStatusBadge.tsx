// src/modules/withdrawal/components/WithdrawStatusBadge.tsx

import type { WithdrawalStatus } from "../types/withdraw.types";

export default function WithdrawStatusBadge({
    status,
}: {
    status: WithdrawalStatus;
}) {
    const map = {
        pending: "var(--color-warning)",
        processing: "var(--color-primary)",
        completed: "var(--color-success)",
        failed: "var(--color-error)",
        cancelled: "var(--text-muted)",
    };

    const label = {
        pending: "Menunggu",
        processing: "Diproses",
        completed: "Berhasil",
        failed: "Gagal",
        cancelled: "Dibatalkan",
    };

    return (
        <span
            style={{
                background: `${map[status]}20`,
                color: map[status],
                borderRadius: "999px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 500,
            }}
        >
            {label[status]}
        </span>
    );
}
