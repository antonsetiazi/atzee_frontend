// src/core/ui/views/cart/cart.types.ts

export interface CartItemType {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface CartSummaryType {
    subtotal: number;
    total: number;
}
