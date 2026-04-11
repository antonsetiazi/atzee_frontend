// src/modules/tracking/components/CustomerDestinationMap.tsx

import MapView from "@/core/ui/map/MapView";
import MapMarker from "@/core/ui/map/MapMarker";

interface Props {
    latitude: number;
    longitude: number;
}

export default function CustomerDestinationMap({ latitude, longitude }: Props) {
    return (
        <MapView center={[latitude, longitude]}>
            <MapMarker position={[latitude, longitude]} variant="destination" />
        </MapView>
    );
}
