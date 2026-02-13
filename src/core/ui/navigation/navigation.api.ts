// src/core/ui/navigation/navigation.api.ts

import { httpGet } from "@/core/http/http.client";

export interface NavigationItem {
    label: string;
    icon: string;
    action_type: string;
    target: string;
    route: string | null;
    is_primary: boolean;
    badge: number | null;
}

export interface NavigationResponse {
    type: string;
    device: string;
    app: string;
    items: NavigationItem[];
}

export function fetchNavigation(
    type: string,
    device: "mobile" | "desktop",
    app = "business",
): Promise<NavigationResponse> {
    return httpGet<NavigationResponse>(
        `/ui/navigation/?type=${type}&app=${app}&device=${device}`,
    );
}
