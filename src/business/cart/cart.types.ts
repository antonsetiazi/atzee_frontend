// src/business/cart/cart.types.ts

export interface CartItem {
    id: string;
    listingId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}
