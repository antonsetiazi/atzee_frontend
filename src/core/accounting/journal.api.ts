// src/core/accounting/journal.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "@/core/http/http.client";

export function submitJournal(data: any) {
    return httpPost(
        "/entities/accounting/accounting.journals.create/execute/",
        data,
    );
}
