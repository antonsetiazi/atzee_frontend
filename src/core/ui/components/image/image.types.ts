// src/core/ui/components/image/image.types.ts

export interface ImageProps {
    src?: string;
    alt?: string;

    width?: number | string;
    height?: number | string;

    fit?: "cover" | "contain";

    rounded?: boolean;
    fallback?: string;

    className?: string;

    loading?: "lazy" | "eager";

    onClick?: () => void;
}
