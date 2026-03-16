import { Image } from "@/core/ui/components";

export default function ImageSample() {
    return (
        <div className="p-10 flex gap-6">
            {/* Normal image */}
            <Image
                src="https://picsum.photos/400"
                width={200}
                height={200}
                rounded
            />

            {/* Contain image */}
            <Image
                src="https://picsum.photos/400"
                width={200}
                height={200}
                fit="contain"
                className="bg-[var(--color-surface-alt)] p-2"
            />

            {/* Fallback */}
            <Image
                src="/invalid.jpg"
                fallback="/placeholder.png"
                width={200}
                height={200}
                rounded
            />
        </div>
    );
}
