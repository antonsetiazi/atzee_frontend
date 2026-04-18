// src/modules/account/bank/types/bank.types.ts

export interface BankAccount {
    id: string;
    bank_id: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    is_default: boolean;
    is_verified: boolean;
    created_at: string;
}

export interface BankPayload {
    bank_id: string;
    account_number: string;
    account_name: string;
    is_default?: boolean;
}
