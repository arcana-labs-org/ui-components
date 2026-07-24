import type { MouseEvent, ReactNode } from "react";

/**
 * `<ShadcnBadge>` — React port. Pill/badge shadcn. Emite `span.shadcn-badge` +
 * `shadcn-badge--${variant}` (+ `--sm`, `--clickable`) e o `span.shadcn-badge__dot`
 * opcional, idêntico ao SFC Vue.
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 * - `@click` no root → `onClick`
 */
export type ShadcnBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";

export interface ShadcnBadgeProps {
    variant?: ShadcnBadgeVariant;
    dot?: boolean;
    size?: "sm" | "md";
    clickable?: boolean;
    onClick?: (ev: MouseEvent<HTMLSpanElement>) => void;
    className?: string;
    children?: ReactNode;
}

export function ShadcnBadge({
    variant = "neutral",
    dot = false,
    size = "md",
    clickable = false,
    onClick,
    className,
    children,
}: ShadcnBadgeProps) {
    const classes = [
        "shadcn-badge",
        `shadcn-badge--${variant}`,
        size === "sm" ? "shadcn-badge--sm" : "",
        clickable ? "shadcn-badge--clickable" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} onClick={onClick}>
            {dot ? <span className="shadcn-badge__dot" /> : null}
            {children}
        </span>
    );
}
