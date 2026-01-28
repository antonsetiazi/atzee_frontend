// src/business/schema/ui-schema.api.ts

import { httpGet } from "@/core/http/http.client";
import type { UISchema } from "./ui-schema.types";

export async function fetchUISchema(pageKey: string): Promise<UISchema> {
    return httpGet(`/ui/pages/${pageKey}/`);
}
