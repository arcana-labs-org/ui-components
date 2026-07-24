import type { CSSProperties, ReactNode } from "react";

/**
 * `<ArcanaSummaryTilesGroup>` — React port. Container grid pros tiles de resumo. Reproduz
 * `<div class="arcana-summary-tiles" style="--arcana-summary-tiles-cols: N">`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 */
export interface ArcanaSummaryTilesGroupProps {
    columns?: number | string;
    format?: "columns" | "rows";
    children?: ReactNode;
    className?: string;
}

export function ArcanaSummaryTilesGroup({
    columns = 3,
    format = "columns",
    children,
    className,
}: ArcanaSummaryTilesGroupProps) {
    const style = {
        "--arcana-summary-tiles-cols": String(columns),
    } as CSSProperties;

    return (
        <div
            className={[
                "arcana-summary-tiles",
                format === "rows" ? "arcana-summary-tiles--rows" : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={style}
        >
            {children}
        </div>
    );
}
