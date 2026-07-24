import type { CSSProperties } from "react";

/**
 * `<ArcanaSkeleton>` — React port. Placeholder shimmer. Reproduz
 * `<span class="arcana-skeleton arcana-skeleton--rounded-${rounded}">` com width/height
 * inline e `aria-hidden`, idêntico ao SFC.
 */
export interface ArcanaSkeletonProps {
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full" | "none";
    className?: string;
}

export function ArcanaSkeleton({
    width = "100%",
    height = "14px",
    rounded = "md",
    className,
}: ArcanaSkeletonProps) {
    const classes = [
        "arcana-skeleton",
        `arcana-skeleton--rounded-${rounded}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const style: CSSProperties = { width, height };

    return <span className={classes} style={style} aria-hidden="true" />;
}
