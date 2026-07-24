import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

/**
 * `<ArcanaSwitchSegmented>` — React port. Reproduz `<div class="arcana-switch-segmented">`
 * (+ `is-on`/`is-disabled`/`is-compact`/`is-squared`), o `__indicator` e as duas metades
 * `__option--off`/`__option--on` (com `__radio` opcional), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - slots `#off-label`/`#on-label` → props `offSlot`/`onSlot` (ReactNode)
 */
export interface ArcanaSwitchSegmentedProps {
    value?: boolean;
    offLabel?: string;
    onLabel?: string;
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
    const ariaLabelFallback = `${offLabel} ou ${onLabel}`;

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
                    <span
                        className="arcana-switch-segmented__radio"
                        aria-hidden="true"
                    />
                ) : null}
                {offSlot ?? offLabel}
            </div>
            <div className="arcana-switch-segmented__option arcana-switch-segmented__option--on">
                {radio ? (
                    <span
                        className="arcana-switch-segmented__radio"
                        aria-hidden="true"
                    />
                ) : null}
                {onSlot ?? onLabel}
            </div>
        </div>
    );
}
