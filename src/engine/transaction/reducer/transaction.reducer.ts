// src/engine/transaction/reducer/transaction.reducer.ts

import type {
    TransactionState,
    TransactionAction,
} from "../types/transaction.types";

export function transactionReducer(
    state: TransactionState,
    action: TransactionAction,
): TransactionState {
    switch (action.type) {
        case "ADD_ITEM": {
            const exists = state.items.find(
                (i) => i.product_id === action.payload.product_id,
            );

            if (exists) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.product_id === action.payload.product_id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i,
                    ),
                };
            }

            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload),
            };

        case "UPDATE_QTY":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, quantity: action.payload.qty }
                        : i,
                ),
            };

        case "UPDATE_PRICE":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, unit_price: action.payload.price }
                        : i,
                ),
            };

        case "SET_HEADER":
            return {
                ...state,
                header: {
                    ...state.header,
                    ...action.payload,
                },
            };

        case "RESET":
            return state;

        default:
            return state;
    }
}
