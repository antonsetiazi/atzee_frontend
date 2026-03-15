import { GeoMap } from "@/core/ui/components";

export default function GeoMapSample() {
    return (
        <div>
            <GeoMap
                center={{
                    lat: -6.2088,
                    lng: 106.8456,
                }}
            />
            <GeoMap
                zoom={12}
                markers={[
                    {
                        lat: -6.2088,
                        lng: 106.8456,
                        label: "Jakarta",
                    },
                    {
                        lat: -6.9147,
                        lng: 107.6098,
                        label: "Bandung",
                    },
                ]}
            />
        </div>
    );
}
