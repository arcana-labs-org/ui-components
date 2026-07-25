import type { CSSProperties, ReactNode } from "react";

import { clampProgressValue, formatProgressLabel, progressPercent } from "../core/progress";

/**
 * `<ArcanaProgress>` — React port. Barra de progresso determinada ou indeterminada.
 * Reproduz `<div class="arcana-progress arcana-progress--{size} --{variant} --{tone}
 * --radius-{radius}">` (+ `is-indeterminate`), o `__track` (que carrega `role="progressbar"`
 * e os `aria-value*`), o `__indicator` e o `__value`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot `#value` → prop `valueSlot` (ReactNode)
 *
 * Acessibilidade: `aria-valuemin`/`aria-valuemax` sempre; `aria-valuenow`/`aria-valuetext`
 * só no determinado — omitidos quando `value` é `null`/`undefined` (é assim que o leitor de
 * tela reconhece progresso desconhecido).
 */
export type ProgressTone = "accent" | "success" | "danger" | "warning" | "info";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "solid" | "soft";
export type ProgressRadius = "none" | "sm" | "md" | "lg" | "full";

export interface ArcanaProgressProps {
    /** 0–`max`. `null`/`undefined` = indeterminado. Fora da faixa é clampado. */
    value?: number | null;
    /** Teto da escala (default `100`). `max <= 0` cai pro default. */
    max?: number;
    size?: ProgressSize;
    variant?: ProgressVariant;
    tone?: ProgressTone;
    /** Mostra o rótulo `NN%` ao lado da barra. */
    showValue?: boolean;
    /** Rótulo usado no modo indeterminado (default `"…"`). */
    indeterminateText?: string;
    radius?: ProgressRadius;
    ariaLabel?: string;
    valueSlot?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function ArcanaProgress({
    value = null,
    max = 100,
    size = "md",
    variant = "solid",
    tone = "accent",
    showValue = false,
    indeterminateText = "…",
    radius = "full",
    ariaLabel = "",
    valueSlot,
    className,
    style,
}: ArcanaProgressProps) {
    const percent = progressPercent(value, max);
    const isIndeterminate = percent === null;
    const clamped = clampProgressValue(value, max);
    const percentLabel = formatProgressLabel(value, max);
    const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;

    const rootClasses = [
        "arcana-progress",
        `arcana-progress--${size}`,
        `arcana-progress--${variant}`,
        `arcana-progress--${tone}`,
        `arcana-progress--radius-${radius}`,
        isIndeterminate ? "is-indeterminate" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses} style={style}>
            <div
                className="arcana-progress__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={normalizedMax}
                aria-valuenow={isIndeterminate ? undefined : (clamped ?? undefined)}
                aria-valuetext={isIndeterminate ? undefined : percentLabel}
                aria-label={ariaLabel || undefined}
            >
                {/* No indeterminado a largura é fixa pelo CSS (a animação é que anda). */}
                <div
                    className="arcana-progress__indicator"
                    style={isIndeterminate ? undefined : { width: `${percent}%` }}
                />
            </div>

            {showValue ? (
                <span className="arcana-progress__value">
                    {valueSlot ?? (isIndeterminate ? indeterminateText : percentLabel)}
                </span>
            ) : null}
        </div>
    );
}
