// src/modules/partner_order/components/PartnerOrderDetailView.tsx

import type { Order } from "@/business/order/order.types";
import { HeaderPage } from "@/core/ui/components";
import PartnerOrderItems from "./PartnerOrderItems";
import PartnerOrderCustomer from "./PartnerOrderCustomer";
import PartnerOrderBooking from "./PartnerOrderBooking";
import PartnerOrderAddress from "./PartnerOrderAddress";
import PartnerOrderHeader from "./PartnerOrderHeader";
import PartnerOrderLocationMap from "./PartnerOrderLocationMap";
import PartnerOrderTimeline from "./PartnerOrderTimeline";
import PartnerOrderAction from "./PartnerOrderAction";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

interface Props {
    order: Order;
    onChatNow?: () => void;
}

export default function PartnerOrderDetailView({ order, onChatNow }: Props) {
    return (
        <>
            <HeaderPage title="Detail Order" />

            <div className="p-4 space-y-4">
                {/* HEADER */}
                <PartnerOrderHeader order={order} />

                {/* CUSTOMER */}
                <PartnerOrderCustomer order={order} />

                {/* BOOKING */}
                <PartnerOrderBooking order={order} />

                {/* DETAIL ITEMS */}
                <PartnerOrderItems order={order} />

                {/* ORDER ADDRESS */}
                <PartnerOrderAddress order={order} />

                {/* DESTINATION MAP */}
                <PartnerOrderLocationMap order={order} />

                {/* TIMELINE */}
                <PartnerOrderTimeline status={order.status} />

                {/* ACTION BUTTONS */}
                <PartnerOrderAction order={order} />

                {/* CHAT CTA */}
                {onChatNow && (
                    <div className="flex justify-end">
                        <button
                            onClick={onChatNow}
                            className="
                                inline-flex items-center gap-2
                                px-4 py-2.5 rounded-full
                                bg-[var(--color-primary)]
                                text-white text-sm font-medium
                                shadow-md
                                active:scale-95 transition
                            "
                        >
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                            Chat Customer
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
