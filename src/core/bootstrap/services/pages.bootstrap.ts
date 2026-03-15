// src/core/bootstrap/services/pages.bootstrap.ts

import { usePageStore } from "@/core/ui/page/page.store";

export async function PagesBootstrap() {
    await usePageStore.getState().loadPages();
}
