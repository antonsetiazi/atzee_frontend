// src/modules/checkout/components/CheckoutView.tsx

import { useState } from "react";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import type { CheckoutItem } from "@/business/checkout/checkout.types";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutMobile from "./layouts/CheckoutMobile";
import CheckoutDesktop from "./layouts/CheckoutDesktop";

interface Props {
    items: CheckoutItem[];
    onPay: () => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export default function CheckoutView({
    items,
    onPay,
    onCancel,
    isSubmitting,
}: Props) {
    const { isMobile } = useBreakpoint();
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const {
        selectedAddress,
        selectedPartner,
        fees,
        subtotal,
        total,
        paymentMethod,
    } = useCheckout();

    const sharedProps = {
        items,
        fees,
        subtotal,
        total,
        paymentMethod,
        onPay,
        onCancel,
        isSubmitting,
        selectedAddress,
        selectedPartner,
        addressModalOpen,
        setAddressModalOpen,
    };

    return isMobile ? (
        <CheckoutMobile {...sharedProps} />
    ) : (
        <CheckoutDesktop {...sharedProps} />
    );
}
