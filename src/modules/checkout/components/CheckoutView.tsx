// src/modules/checkout/components/CheckoutView.tsx

import { useMemo, useState } from "react";
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
    const { selectedAddress, selectedPartner } = useCheckout();

    const total = useMemo(() => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [items]);

    const sharedProps = {
        items,
        total,
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
