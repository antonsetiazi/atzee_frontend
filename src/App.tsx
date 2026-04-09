// src/App.tsx

import { ErrorBoundary } from "@/core/feedback/ErrorBoundary";
import { BrandingProvider } from "@/core/ui/branding/BrandingProvider";
import AppRouter from "./core/routing/AppRouter";
import { PlatformBootstrap } from "@/core/bootstrap/components/PlatformBootstrap";

function App() {
    return (
        <ErrorBoundary>
            <PlatformBootstrap>
                <BrandingProvider>
                    <AppRouter />
                </BrandingProvider>
            </PlatformBootstrap>
        </ErrorBoundary>
    );
}

export default App;
