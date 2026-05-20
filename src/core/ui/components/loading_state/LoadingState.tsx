// src/core/ui/components/loading_state/LoadingState.tsx

interface Props {
    title?: string;
    description?: string;
    fullScreen?: boolean;
}

export default function LoadingState({
    title = "Loading Data",
    description = "Please wait while we prepare your workspace...",
    fullScreen = false,
}: Props) {
    return (
        <div
            className={`flex w-full items-center justify-center ${fullScreen ? "min-h-screen" : "min-h-[320px]"} `}
        >
            <div className="flex max-w-sm flex-col items-center text-center">
                {/* Animated Loader */}
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--color-primary)]/10 blur-xl" />

                    {/* Spinner Ring */}
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-primary)]" />

                    {/* Inner Dot */}
                    <div className="absolute h-3 w-3 rounded-full bg-[var(--color-accent)]" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold text-[var(--text-primary)]">{title}</h2>

                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
