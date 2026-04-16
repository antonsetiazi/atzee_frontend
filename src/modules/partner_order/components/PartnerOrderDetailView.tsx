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

interface Props {
    order: Order;
}

export default function PartnerOrderDetailView({ order }: Props) {
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
            </div>
        </>
    );
}
