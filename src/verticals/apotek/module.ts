// src/verticals/apotek/module.ts

import { registerVertical } from "@/core/vertical/vertical.registry";
import { apotekManifest } from "./manifest";

/**
 * 1️⃣ Hanya register vertical di core registry
 *    - Tidak menyentuh frontend routes / UI / menus
 *    - Core akan mengeksekusi UI berdasarkan schema yang backend kirim
 */
registerVertical(apotekManifest);
