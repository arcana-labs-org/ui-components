import type { CSSProperties, ReactNode } from "react";

import { formatStatisticValue } from "../core/statistic";

/**
 * `<ArcanaStatistic>` — React port. Número em destaque com rótulo. Reproduz
 * `<div class="arcana-statistic arcana-statistic--{size} arcana-statistic--{tone}">`, o
 * `__title`, o `__content` com `__icon`/`__prefix`/`__value`/`__suffix`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slots `#title`/`#prefix`/`#suffix` → props `titleSlot`/`prefixSlot`/`suffixSlot` (ReactNode)
 * - `valueColor` → inline `--arcana-statistic-value-color` na raiz (vale pro valor e pro ícone)
 *
 * A formatação numérica vive em `core/statistic.ts` (framework-agnóstica e testada): string
 * passa intacta, número é agrupado/fixado, `locale` liga o `Intl.NumberFormat` e vence os
 * separadores manuais.
 */
export type StatisticTone = "neutral" | "success" | "danger" | "warning" | "info";
export type StatisticSize = "sm" | "md" | "lg" | "xl";

export interface ArcanaStatisticProps {
    /** Número exibido. String passa intacta (escape hatch pra valor já formatado). */
    value?: number | string | null;
    title?: string;
    /** Alias de `title` (`title` vence quando os dois vêm). */
    label?: string;
    /** Casas decimais fixas. Omitido = mantém as casas do próprio número. */
    precision?: number;
    /** Separador de milhar (default `","`); `""` desliga o agrupamento. */
    groupSeparator?: string;
    /** Separador decimal (default `"."`). */
    decimalSeparator?: string;
    /** Quando informado, `Intl.NumberFormat` assume e ignora os separadores manuais. */
    locale?: string;
    /** Controle total da string final — tem precedência sobre todo o resto. */
    formatter?: (value: number | string | null) => string;
    prefix?: string;
    suffix?: string;
    tone?: StatisticTone;
    /** Cor CSS arbitrária do valor; vence o `tone`. */
    valueColor?: string;
    size?: StatisticSize;
    /** Classe do ícone (ex: `"fa-solid fa-arrow-trend-up"`). */
    icon?: string;
    titleSlot?: ReactNode;
    prefixSlot?: ReactNode;
    suffixSlot?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function ArcanaStatistic({
    value = null,
    title = "",
    label = "",
    precision,
    groupSeparator = ",",
    decimalSeparator = ".",
    locale = "",
    formatter,
    prefix = "",
    suffix = "",
    tone = "neutral",
    valueColor = "",
    size = "md",
    icon = "",
    titleSlot,
    prefixSlot,
    suffixSlot,
    className,
    style,
}: ArcanaStatisticProps) {
    const resolvedTitle = title || label;
    const hasTitle = Boolean(titleSlot || resolvedTitle);
    const hasPrefix = Boolean(prefixSlot || prefix);
    const hasSuffix = Boolean(suffixSlot || suffix);

    const displayValue = formatter
        ? formatter(value ?? null)
        : formatStatisticValue(value, {
              precision,
              groupSeparator,
              decimalSeparator,
              locale: locale || undefined,
          });

    const rootClasses = [
        "arcana-statistic",
        `arcana-statistic--${size}`,
        `arcana-statistic--${tone}`,
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const rootStyle = valueColor
        ? ({ ...(style ?? {}), "--arcana-statistic-value-color": valueColor } as CSSProperties)
        : style;

    return (
        <div className={rootClasses} style={rootStyle}>
            {hasTitle ? (
                <div className="arcana-statistic__title">{titleSlot ?? resolvedTitle}</div>
            ) : null}

            <div className="arcana-statistic__content">
                {icon ? (
                    <span className="arcana-statistic__icon" aria-hidden="true">
                        <i className={icon} />
                    </span>
                ) : null}

                {hasPrefix ? (
                    <span className="arcana-statistic__prefix">{prefixSlot ?? prefix}</span>
                ) : null}

                <span className="arcana-statistic__value">{displayValue}</span>

                {hasSuffix ? (
                    <span className="arcana-statistic__suffix">{suffixSlot ?? suffix}</span>
                ) : null}
            </div>
        </div>
    );
}
