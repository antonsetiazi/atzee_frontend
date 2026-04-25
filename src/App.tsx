// src/App.tsx

import { ErrorBoundary } from "@/core/feedback/ErrorBoundary";
import { BrandingProvider } from "@/core/ui/branding/BrandingProvider";
import AppRouter from "./core/routing/AppRouter";
import { PlatformBootstrap } from "@/core/bootstrap/components/PlatformBootstrap";
import RealtimeBootstrap from "@/core/realtime/RealtimeBootstrap";

function App() {
    return (
        <ErrorBoundary>
            <PlatformBootstrap>
                <RealtimeBootstrap>
                    <BrandingProvider>
                        <AppRouter />
                    </BrandingProvider>
                </RealtimeBootstrap>
            </PlatformBootstrap>
        </ErrorBoundary>
    );
}

export default App;
