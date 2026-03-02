// src/business/transaction_workspace/engine/transaction.types.ts

export interface TransactionHeaderState {
    transaction_type: string;
    subtype?: string;
    customer?: string;
    partner?: string;
    transaction_date: string;
    notes?: string;
}

export interface TransactionLineState {
    id: string;
    product_id: string;
    name: string;
    quantity: number;
    unit_price: number;
}

export interface TransactionState {
    header: TransactionHeaderState;
    items: TransactionLineState[];
}

export type TransactionAction =
    | { type: "ADD_ITEM"; payload: TransactionLineState }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
    | { type: "UPDATE_PRICE"; payload: { id: string; price: number } }
    | { type: "SET_HEADER"; payload: Partial<TransactionHeaderState> }
    | { type: "RESET" };
