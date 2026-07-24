import type { CSSProperties, ReactNode } from "react";

/**
 * `<ShadcnSummaryTile>` — React port. Tile compacto de KPI. Reproduz
 * `<div class="shadcn-summary-tile shadcn-summary-tile--${tone}">`, o `__icon`,
 * `__main`/`__label`/`__sub` e `__value`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slots `#value`/`#sub` → props `valueSlot`/`subSlot` (ReactNode)
 */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";

export interface ShadcnSummaryTileProps {
    label: string;
    value?: string | number | null;
    icon?: string;
    sub?: string;
    tone?: SummaryTileTone;
    valueSlot?: ReactNode;
    subSlot?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function ShadcnSummaryTile({
    label,
    value = null,
    icon = "",
    sub = "",
    tone = "neutral",
    valueSlot,
    subSlot,
    className,
    style,
}: ShadcnSummaryTileProps) {
    const hasSub = Boolean(subSlot || sub);

    const rootClasses = [
        "shadcn-summary-tile",
        `shadcn-summary-tile--${tone}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses} style={style}>
            {icon ? (
                <span className="shadcn-summary-tile__icon" aria-hidden="true">
                    <i className={icon} />
                </span>
            ) : null}

            <div className="shadcn-summary-tile__main">
                <span className="shadcn-summary-tile__label">{label}</span>
                {hasSub ? (
                    <span className="shadcn-summary-tile__sub">{subSlot ?? sub}</span>
                ) : null}
            </div>

            <span className="shadcn-summary-tile__value">{valueSlot ?? value}</span>
        </div>
    );
}
