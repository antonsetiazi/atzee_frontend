// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/core/ui/animations.css";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";

async function bootstrap() {
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

bootstrap();
