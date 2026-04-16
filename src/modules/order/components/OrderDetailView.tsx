// src/modules/order/components/OrderDetailView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Order } from "@/business/order/order.types";
import { HeaderPage } from "@/core/ui/components";
import OrderItems from "./sections/OrderItems";
import OrderCard from "./sections/OrderCard";
import OrderTracking from "./sections/OrderTracking";
import OrderReview from "./sections/OrderReview";
import OrderPartner from "./sections/OrderPartner";
import OrderBooking from "./sections/OrderBooking";
import OrderTimeline from "./sections/OrderTimeline";
import OrderAction from "./sections/OrderAction";

interface Props {
    order: Order;
    booking: any;
}

export default function OrderDetailView({ order, booking }: Props) {
    return (
        <>
            <HeaderPage title="Rincian Pesanan" />

            <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* ORDER CARD */}
                <OrderCard order={order} />

                {/* ITEMS */}
                <OrderItems order={order} />

                {/* BOOKING INFO */}
                <OrderBooking booking={booking} />

                {/* TRACKING */}
                <OrderTracking order={order} />

                {/* PARTNER */}
                <OrderPartner order={order} />

                {/* TIMELINE */}
                <OrderTimeline status={order.status} />

                {/* ACTION */}
                <OrderAction order={order} />

                {/* REVIEW */}
                <OrderReview booking={booking} />
            </div>
        </>
    );
}
