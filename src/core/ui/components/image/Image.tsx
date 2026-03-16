// src/core/ui/components/image/Image.tsx

import { useState } from "react";
import type { ImageProps } from "./image.types";

export default function Image({
    src,
    alt = "",
    width,
    height,
    fit = "cover",
    rounded = false,
    fallback,
    className = "",
    loading = "lazy",
    onClick,
}: ImageProps) {
    const [error, setError] = useState(false);

    const showSrc = !error ? src : fallback;

    const objectFit = fit === "contain" ? "object-contain" : "object-cover";

    return (
        <img
            src={showSrc}
            alt={alt}
            loading={loading}
            onError={() => setError(true)}
            onClick={onClick}
            className={`
                ${objectFit}
                ${rounded ? "rounded-[var(--radius)]" : ""}
                ${onClick ? "cursor-pointer" : ""}
                transition
                duration-200
                ${className}
            `}
            style={{
                width,
                height,
            }}
        />
    );
}
