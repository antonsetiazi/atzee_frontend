// src/modules/checkout/components/PaymentStatusBadge.tsx

import type { PaymentStatus } from "@/business/checkout/checkout.types";

export default function PaymentStatusBadge({
    status,
}: {
    status: PaymentStatus;
}) {
    const map = {
        paid: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
        idle: "bg-gray-100 text-gray-500",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm ${map[status]}`}>
            {status.toUpperCase()}
        </span>
    );
}
