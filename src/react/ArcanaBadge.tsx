import type { MouseEvent, ReactNode } from "react";

/**
 * `<ArcanaBadge>` — React port. Pill/badge shadcn. Emite `span.arcana-badge` +
 * `arcana-badge--${variant}` (+ `--sm`, `--clickable`) e o `span.arcana-badge__dot`
 * opcional, idêntico ao SFC Vue.
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 * - `@click` no root → `onClick`
 */
export type ArcanaBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";

export interface ArcanaBadgeProps {
    variant?: ArcanaBadgeVariant;
    dot?: boolean;
    size?: "sm" | "md";
    clickable?: boolean;
    onClick?: (ev: MouseEvent<HTMLSpanElement>) => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaBadge({
    variant = "neutral",
    dot = false,
    size = "md",
    clickable = false,
    onClick,
    className,
    children,
}: ArcanaBadgeProps) {
    const classes = [
        "arcana-badge",
        `arcana-badge--${variant}`,
        size === "sm" ? "arcana-badge--sm" : "",
        clickable ? "arcana-badge--clickable" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} onClick={onClick}>
            {dot ? <span className="arcana-badge__dot" /> : null}
            {children}
        </span>
    );
}
