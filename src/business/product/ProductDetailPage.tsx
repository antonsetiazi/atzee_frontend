// src/business/product/ProductDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import ListingDetailView from "@/core/ui/views/listing_detail/ListingDetailView";
import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";
import ReviewSection from "@/core/ui/views/review/ReviewSection";
import { dummyReviews } from "@/core/ui/views/review/review.dummy";
import { useCart } from "@/business/cart/cart.hooks";
import { useCheckout } from "@/business/checkout/checkout.hooks";

export default function ProductDetailPage() {
    const { id } = useParams();
    const reviews = dummyReviews;
    const { addItem } = useCart();
    const navigate = useNavigate();
    const { initFromCart } = useCheckout();

    // 🔥 SIMULASI DATA (nanti dari API)
    const data: ListingDetail = {
        id: id || "1",
        type: "product",
        name: "Laptop Premium X",
        images: [
            "https://placehold.co/600x400",
            "https://placeholdit.com/600x400/dddddd/999999",
        ],
        category: "Elektronik",
        location: "Jakarta",
        rating: 4.8,
        sold: 120,
        price: 15000000,
        description: "Laptop premium untuk kebutuhan profesional.",
    };

    return (
        <>
            <ListingDetailView
                data={data}
                onPrimaryAction={(item) => {
                    // 🛒 add to cart
                    addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price!,
                        quantity: 1,
                        image: item.images?.[0],
                    });

                    alert("Data ditambahkan");
                }}
                onBuyNow={(item) => {
                    // ⚡ direct checkout
                    addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price!,
                        quantity: 1,
                        image: item.images?.[0],
                    });

                    initFromCart();
                    navigate("/checkout");
                }}
            />

            <ReviewSection reviews={reviews} />
        </>
    );
}
