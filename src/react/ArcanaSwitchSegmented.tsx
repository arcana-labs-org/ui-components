import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { ArcanaRadioIndicator } from "./ArcanaRadioIndicator";

/**
 * `<ArcanaSwitchSegmented>` — React port. Reproduz `<div class="arcana-switch-segmented">`
 * (+ `is-on`/`is-disabled`/`is-compact`/`is-squared`), o `__indicator` e as duas metades
 * `__option--off`/`__option--on` (com `__radio` opcional), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - slots `#off-label`/`#on-label` → props `offSlot`/`onSlot` (ReactNode)
 *
 * `offIcon`/`onIcon` (classe FontAwesome) viram um `<i class="arcana-switch-segmented__icon">`
 * decorativo antes do texto de cada lado; `offIconColor`/`onIconColor` aplicam `color` inline
 * (vence o CSS, inclusive no lado ativo). Com o label vazio (`offLabel=""`) o lado fica
 * icon-only, com o ícone centralizado — nenhum texto é forçado.
 */
export interface ArcanaSwitchSegmentedProps {
    value?: boolean;
    offLabel?: string;
    onLabel?: string;
    /** Classe FontAwesome do ícone da opção esquerda (ex: `"fa-solid fa-moon"`). */
    offIcon?: string;
    /** Classe FontAwesome do ícone da opção direita (ex: `"fa-solid fa-sun"`). */
    onIcon?: string;
    /** Cor inline do `offIcon` (qualquer string CSS válida). */
    offIconColor?: string;
    /** Cor inline do `onIcon`. */
    onIconColor?: string;
    disabled?: boolean;
    ariaLabel?: string;
    compact?: boolean;
    squared?: boolean;
    activeColor?: string;
    radio?: boolean;
    offSlot?: ReactNode;
    onSlot?: ReactNode;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    className?: string;
}

export function ArcanaSwitchSegmented({
    value = false,
    offLabel = "Inativo",
    onLabel = "Ativo",
    offIcon = "",
    onIcon = "",
    offIconColor = "",
    onIconColor = "",
    disabled = false,
    ariaLabel = "",
    compact = false,
    squared = false,
    activeColor = "",
    radio = false,
    offSlot,
    onSlot,
    onValueChange,
    onChange,
    className,
}: ArcanaSwitchSegmentedProps) {
    // Labels vazios (modo icon-only) são descartados pra não gerar " ou ".
    const ariaLabelFallback = [offLabel, onLabel].filter(Boolean).join(" ou ");

    const toggle = () => {
        if (disabled) return;
        const next = !value;
        onValueChange?.(next);
        onChange?.(next);
    };

    const onKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
            return;
        }
        if (e.key === "ArrowLeft" && value) {
            e.preventDefault();
            toggle();
        }
        if (e.key === "ArrowRight" && !value) {
            e.preventDefault();
            toggle();
        }
    };

    const rootClasses = [
        "arcana-switch-segmented",
        value ? "is-on" : "",
        disabled ? "is-disabled" : "",
        compact ? "is-compact" : "",
        squared ? "is-squared" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const rootStyle = activeColor
        ? ({ "--seg-active": activeColor } as CSSProperties)
        : undefined;

    return (
        <div
            className={rootClasses}
            style={rootStyle}
            role="switch"
            aria-checked={Boolean(value)}
            aria-label={ariaLabel || ariaLabelFallback || undefined}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={toggle}
            onKeyDown={onKeydown}
        >
            <div className="arcana-switch-segmented__indicator" aria-hidden="true" />

            <div className="arcana-switch-segmented__option arcana-switch-segmented__option--off">
                {radio ? (
                    <ArcanaRadioIndicator
                        tone="on-solid"
                        size="sm"
                        checked={!value}
                    />
                ) : null}
                {offIcon ? (
                    <i
                        className={`arcana-switch-segmented__icon ${offIcon}`}
                        style={offIconColor ? { color: offIconColor } : undefined}
                        aria-hidden="true"
                    />
                ) : null}
                {offSlot ?? (offLabel || null)}
            </div>
            <div className="arcana-switch-segmented__option arcana-switch-segmented__option--on">
                {radio ? (
                    <ArcanaRadioIndicator
                        tone="on-solid"
                        size="sm"
                        checked={Boolean(value)}
                    />
                ) : null}
                {onIcon ? (
                    <i
                        className={`arcana-switch-segmented__icon ${onIcon}`}
                        style={onIconColor ? { color: onIconColor } : undefined}
                        aria-hidden="true"
                    />
                ) : null}
                {onSlot ?? (onLabel || null)}
            </div>
        </div>
    );
}
