// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/core/ui/animations.css";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";
import { useAppConfigStore } from "@/core/config/appConfig.store";

async function bootstrap() {
    // 1. LOAD PLATFORM RUNTIME CONFIG
    await useAppConfigStore.getState().load();

    // 2. BOOTSTRAP REACT
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("Root element not found");
    }

    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

// 3. START PLATFORM
bootstrap();
