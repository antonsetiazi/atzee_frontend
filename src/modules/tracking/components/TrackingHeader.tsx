// src/modules/tracking/components/TrackingHeader.tsx

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function TrackingHeader() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center p-4 border-b">
            <button onClick={() => navigate(-1)}>
                <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="ml-3 font-semibold">Live Tracking</h1>
        </div>
    );
}
