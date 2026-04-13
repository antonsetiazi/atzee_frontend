// src/modules/withdrawal/components/WithdrawHistoryList.tsx

import type { Withdrawal } from "../types/withdraw.types";
import WithdrawHistoryItem from "./WithdrawHistoryItem";

export default function WithdrawHistoryList({ data }: { data: Withdrawal[] }) {
    return (
        <div className="space-y-3">
            {data.map((item) => (
                <WithdrawHistoryItem key={item.id} item={item} />
            ))}
        </div>
    );
}
