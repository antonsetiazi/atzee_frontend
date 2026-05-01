// src/core/ui-schema/ui-schema.api.ts

import { httpGet } from "@/core/http/http.client";
import type { UISchema } from "@/engine/ui/schema/ui-schema";

export async function fetchUISchema(pageKey: string): Promise<UISchema> {
    return httpGet(`/ui/pages/${pageKey}/`);
}
