// src/modules/tracking/pages/TrackingPage.tsx

import { useParams } from "react-router-dom";
import { useTracking } from "../hooks/useTracking";

import TrackingHeader from "../components/TrackingHeader";
import TrackingMap from "../components/TrackingMap";
import TrackingStatus from "../components/TrackingStatus";

export default function TrackingPage() {
    const { id } = useParams();
    const { data, loading } = useTracking(Number(id));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Tracking tidak tersedia</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <TrackingHeader />

            <div className="flex-1">
                <TrackingMap data={data} />
            </div>

            <TrackingStatus />
        </div>
    );
}
