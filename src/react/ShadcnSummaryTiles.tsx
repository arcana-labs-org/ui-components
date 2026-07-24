import type { CSSProperties, ReactNode } from "react";

/**
 * `<ShadcnSummaryTiles>` — React port. Container grid pros tiles de resumo. Reproduz
 * `<div class="shadcn-summary-tiles" style="--shadcn-summary-tiles-cols: N">`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 */
export interface ShadcnSummaryTilesProps {
    columns?: number | string;
    children?: ReactNode;
    className?: string;
}

export function ShadcnSummaryTiles({
    columns = 3,
    children,
    className,
}: ShadcnSummaryTilesProps) {
    const style = {
        "--shadcn-summary-tiles-cols": String(columns),
    } as CSSProperties;

    return (
        <div
            className={["shadcn-summary-tiles", className ?? ""]
                .filter(Boolean)
                .join(" ")}
            style={style}
        >
            {children}
        </div>
    );
}
