// src/modules/account/bank/types/master-bank.types.ts

export interface MasterBank {
    id: string;
    code: string;
    name: string;
    short_name?: string;
    is_active?: boolean;
}
