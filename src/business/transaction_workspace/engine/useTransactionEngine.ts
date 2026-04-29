/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/transaction_workspace/engine/useTransactionEngine.ts

import { useReducer } from "react";
import { generateId } from "@/core/identity/id.generator";
import { transactionReducer } from "./transaction.reducer";
import type {
    TransactionState,
    TransactionLineState,
} from "./transaction.types";

export function useTransactionEngine(
    transactionType: string,
    subtype?: string,
) {
    const initialState: TransactionState = {
        header: {
            transaction_type: transactionType,
            subtype,
            transaction_date: new Date().toISOString().split("T")[0],
        },
        items: [],
    };

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const addItem = (product: any) => {
        const line: TransactionLineState = {
            id: generateId(),
            product_id: product.id,
            name: product.name,
            quantity: product.quantity ?? 1,
            unit_price: product.unit_price ?? product.price ?? 0,
        };

        dispatch({ type: "ADD_ITEM", payload: line });
    };

    const subtotal = state.items.reduce(
        (sum, i) => sum + i.quantity * i.unit_price,
        0,
    );

    const buildPayload = () => ({
        ...state.header,
        items: state.items.map((i) => ({
            product: i.product_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
        })),
    });

    return {
        state,
        dispatch,
        addItem,
        subtotal,
        buildPayload,
    };
}
