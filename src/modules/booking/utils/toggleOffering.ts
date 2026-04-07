// src/modules/booking/utils/toggleOffering.ts

import { bookingService } from "../services/booking.service";
import type { ServiceOfferingUI } from "../types/booking.types";

export function toggleOffering(
    offeringId: number,
    current: number[],
    allOfferings: ServiceOfferingUI[],
    resourceId?: string,
) {
    let updated: number[];

    if (current.includes(offeringId)) {
        updated = current.filter((x) => x !== offeringId);
    } else {
        updated = [...current, offeringId];
    }

    const selectedFull = allOfferings.filter((o) =>
        updated.includes(o.product_id),
    );

    bookingService.setOfferings(
        selectedFull.map((o) => ({
            id: o.product_id,
            name: o.product_name,
            duration: o.duration_minutes,
            price: o.price,
        })),
    );

    if (resourceId) {
        bookingService.selectResource(resourceId);
    }

    return updated;
}
