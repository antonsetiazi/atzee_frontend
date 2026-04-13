// src/modules/withdrawal/components/WithdrawHistoryItem.tsx

import type { Withdrawal } from "../types/withdraw.types";
import WithdrawStatusBadge from "./WithdrawStatusBadge";
import { formatValue } from "@/shared/utils/formatValue";

export default function WithdrawHistoryItem({ item }: { item: Withdrawal }) {
    return (
        <div
            className="p-4 flex justify-between items-center"
            style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div className="space-y-1">
                <div
                    className="font-semibold text-base"
                    style={{ color: "var(--text-primary)" }}
                >
                    {formatValue(item.amount, { format: "currency" })}
                </div>

                {/* DATE */}
                <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {formatValue(item.created_at, { format: "datetime" })}
                </div>

                <div className="text-xs text-gray-400">
                    {item.destination?.bank_name} •{" "}
                    {item.destination?.account_number}
                </div>
            </div>

            <WithdrawStatusBadge status={item.status} />
        </div>
    );
}
