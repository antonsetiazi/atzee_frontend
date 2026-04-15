// src/module/account/bank/hooks/useBankForm.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { BankPayload } from "../types/bank.types";

export function useBankForm(initial?: Partial<BankPayload>) {
    const [form, setForm] = useState<BankPayload>({
        bank_name: initial?.bank_name || "",
        account_number: initial?.account_number || "",
        account_name: initial?.account_name || "",
        is_default: initial?.is_default || false,
    });

    const setField = (key: keyof BankPayload, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return {
        form,
        setField,
    };
}
