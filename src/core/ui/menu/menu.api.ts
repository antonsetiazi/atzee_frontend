// src/core/ui/menu/menu.api.ts

import { httpGet } from "@/core/http/http.client";
import type { MenuItem } from "./menu.types";

export function fetchMenu(): Promise<MenuItem[]> {
    return httpGet<MenuItem[]>("/ui/menu");
}
