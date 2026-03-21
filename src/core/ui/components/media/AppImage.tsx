// src/core/ui/components/media/AppImage.tsx

import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
}

export default function AppImage({
    src,
    alt,
    className,
    fallbackText = "No Image",
    ...rest
}: Props) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 text-gray-400 text-xs ${className}`}
            >
                {fallbackText}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...rest}
        />
    );
}
