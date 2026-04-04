// src/modules/order/components/OrderItemRow.tsx

import type { OrderItem } from "@/business/order/order.types";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

interface Props {
    item: OrderItem;
}

export default function OrderItemRow({ item }: Props) {
    return (
        <div className="p-4 border rounded-2xl bg-white shadow-sm">
            <div className="flex justify-between">
                <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-sm text-gray-500">
                        {item.quantity} x{" "}
                        {formatValue(item.price, {
                            format: "currency",
                            currency: DEFAULT_CURRENCY,
                            locale: DEFAULT_LOCALE,
                        })}
                    </p>
                </div>

                <p className="font-semibold">
                    {formatValue(item.price * item.quantity, {
                        format: "currency",
                        currency: DEFAULT_CURRENCY,
                        locale: DEFAULT_LOCALE,
                    })}
                </p>
            </div>
        </div>
    );
}
