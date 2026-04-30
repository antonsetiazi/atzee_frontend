// src/core/branding/engine/applyFavicon.ts

export function applyFavicon(url?: string) {
    if (!url) return;

    document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";

    if (url.endsWith(".svg")) {
        favicon.type = "image/svg+xml";
    } else if (url.endsWith(".png")) {
        favicon.type = "image/png";
    } else if (url.endsWith(".jpg") || url.endsWith(".jpeg")) {
        favicon.type = "image/jpeg";
    }

    favicon.href = url + "?v=" + Date.now();

    document.head.appendChild(favicon);
}
