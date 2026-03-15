import { Slider } from "@/core/ui/components";
import { useState } from "react";

export default function SliderSample() {
    const [value, setValue] = useState(50);
    const [volume, setVolume] = useState(50);
    const [price, setPrice] = useState(50);
    return (
        <div>
            <p>Basic Slider</p>
            <Slider value={value} onChange={setValue} />

            <p>Slider dengan Value</p>
            <Slider value={volume} onChange={setVolume} showValue />

            <p>Slider Range Custom</p>
            <Slider
                value={price}
                min={0}
                max={1000}
                step={10}
                showValue
                onChange={setPrice}
            />
        </div>
    );
}
