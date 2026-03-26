// src/business/product/ProductDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ListingDetailView from "@/core/ui/views/listing_detail/ListingDetailView";
import ReviewSection from "@/core/ui/views/review/ReviewSection";

import { useCart } from "@/business/cart/cart.hooks";
import { useCheckout } from "@/business/checkout/checkout.hooks";

import type { ListingDetail } from "@/core/ui/views/listing_detail/listingDetail.types";
import type { CartItem } from "@/business/cart/cart.types";

import { dummyReviews } from "@/core/ui/views/review/review.dummy";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addItem } = useCart();
    const { initFromCart } = useCheckout();

    // ================================
    // 🔥 ASYNC STATE
    // ================================
    const [data, setData] = useState<ListingDetail | null>(null);
    const [reviews, setReviews] = useState<typeof dummyReviews>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ================================
    // 🔥 FETCH DATA (SIMULASI API)
    // ================================
    useEffect(() => {
        async function fetchDetail() {
            try {
                setLoading(true);

                // 🔥 nanti ganti ke API call
                await new Promise((res) => setTimeout(res, 500));

                const result: ListingDetail = {
                    id: id || "1",
                    type: "product",
                    name: "Laptop Premium X",
                    images: [
                        "https://placehold.co/600x400",
                        "https://placehold.co/600x400",
                    ],
                    category: "Elektronik",
                    location: "Jakarta",
                    rating: 4.8,
                    sold: 120,
                    price: 15000000,
                    description: "Laptop premium untuk kebutuhan profesional.",
                };

                setData(result);

                setReviews(dummyReviews);
                // 🔥 nanti:
                // const reviews = await reviewApi.getByProduct(id)
                // setReviews(reviews);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat produk");
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [id]);

    // ================================
    // 🔥 HANDLER: ADD TO CART
    // ================================
    function handleAddToCart(item: ListingDetail) {
        if (!item.price) return;

        const cartItem: CartItem = {
            id: `${item.id}`, // 🔥 nanti bisa pakai uuid/cartId
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.images?.[0],
        };

        addItem(cartItem);

        alert("Produk ditambahkan ke keranjang");
    }

    // ================================
    // 🔥 HANDLER: BUY NOW
    // ================================
    function handleBuyNow(item: ListingDetail) {
        if (!item.price) return;

        const cartItem: CartItem = {
            id: `${item.id}`,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.images?.[0],
        };

        addItem(cartItem);

        initFromCart();
        navigate("/checkout");
    }

    // ================================
    // 🔥 LOADING STATE
    // ================================
    if (loading) {
        return (
            <div className="p-6 text-center text-[var(--text-muted)]">
                Memuat detail produk...
            </div>
        );
    }

    // ================================
    // 🔥 ERROR STATE
    // ================================
    if (error || !data) {
        return (
            <div className="p-6 text-center text-red-500">
                {error || "Produk tidak ditemukan"}
            </div>
        );
    }

    // ================================
    // 🔥 MAIN RENDER
    // ================================
    return (
        <>
            <ListingDetailView
                data={data}
                onPrimaryAction={handleAddToCart}
                onBuyNow={handleBuyNow}
            />

            {/* ================================ */}
            {/* 🔥 REVIEW SECTION */}
            {/* ================================ */}
            <ReviewSection reviews={reviews} />
        </>
    );
}
