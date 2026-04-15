// src/module/account/bank/hooks/useBankActions.ts

import { createBank, updateBank, deleteBank } from "../api/bank.api";
import type { BankPayload } from "../types/bank.types";

export function useBankActions() {
    const handleCreate = async (data: BankPayload) => {
        return createBank(data);
    };

    const handleUpdate = async (id: string, data: Partial<BankPayload>) => {
        return updateBank(id, data);
    };

    const handleDelete = async (id: string) => {
        return deleteBank(id);
    };

    return {
        create: handleCreate,
        update: handleUpdate,
        remove: handleDelete,
    };
}
