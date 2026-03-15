// src/core/ui/components/circle_avatar/circle_avatar.types.ts

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CircleAvatarProps {
    src?: string;
    name?: string;
    size?: AvatarSize;
    alt?: string;
    className?: string;
}
