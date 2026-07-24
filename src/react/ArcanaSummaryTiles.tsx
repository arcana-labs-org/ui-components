import type { CSSProperties, ReactNode } from "react";

/**
 * `<ArcanaSummaryTiles>` — React port. Container grid pros tiles de resumo. Reproduz
 * `<div class="arcana-summary-tiles" style="--arcana-summary-tiles-cols: N">`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 */
export interface ArcanaSummaryTilesProps {
    columns?: number | string;
    children?: ReactNode;
    className?: string;
}

export function ArcanaSummaryTiles({
    columns = 3,
    children,
    className,
}: ArcanaSummaryTilesProps) {
    const style = {
        "--arcana-summary-tiles-cols": String(columns),
    } as CSSProperties;

    return (
        <div
            className={["arcana-summary-tiles", className ?? ""]
                .filter(Boolean)
                .join(" ")}
            style={style}
        >
            {children}
        </div>
    );
}
