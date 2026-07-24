import type { CSSProperties } from "react";

/**
 * `<ShadcnSkeleton>` — React port. Placeholder shimmer. Reproduz
 * `<span class="shadcn-skeleton shadcn-skeleton--rounded-${rounded}">` com width/height
 * inline e `aria-hidden`, idêntico ao SFC.
 */
export interface ShadcnSkeletonProps {
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full" | "none";
    className?: string;
}

export function ShadcnSkeleton({
    width = "100%",
    height = "14px",
    rounded = "md",
    className,
}: ShadcnSkeletonProps) {
    const classes = [
        "shadcn-skeleton",
        `shadcn-skeleton--rounded-${rounded}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const style: CSSProperties = { width, height };

    return <span className={classes} style={style} aria-hidden="true" />;
}
