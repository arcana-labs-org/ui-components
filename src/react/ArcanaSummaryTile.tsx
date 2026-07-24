import type { CSSProperties, ReactNode } from "react";

/**
 * `<ArcanaSummaryTile>` — React port. Tile compacto de KPI. Reproduz
 * `<div class="arcana-summary-tile arcana-summary-tile--${tone}">`, o `__icon`,
 * `__main`/`__label`/`__sub` e `__value`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slots `#value`/`#sub` → props `valueSlot`/`subSlot` (ReactNode)
 */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";

export interface ArcanaSummaryTileProps {
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

export function ArcanaSummaryTile({
    label,
    value = null,
    icon = "",
    sub = "",
    tone = "neutral",
    valueSlot,
    subSlot,
    className,
    style,
}: ArcanaSummaryTileProps) {
    const hasSub = Boolean(subSlot || sub);

    const rootClasses = [
        "arcana-summary-tile",
        `arcana-summary-tile--${tone}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses} style={style}>
            {icon ? (
                <span className="arcana-summary-tile__icon" aria-hidden="true">
                    <i className={icon} />
                </span>
            ) : null}

            <div className="arcana-summary-tile__main">
                <span className="arcana-summary-tile__label">{label}</span>
                {hasSub ? (
                    <span className="arcana-summary-tile__sub">{subSlot ?? sub}</span>
                ) : null}
            </div>

            <span className="arcana-summary-tile__value">{valueSlot ?? value}</span>
        </div>
    );
}
