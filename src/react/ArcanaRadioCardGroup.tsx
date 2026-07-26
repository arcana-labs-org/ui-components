import { useMemo, useRef, type CSSProperties } from "react";
import { ArcanaRadioIndicator } from "./ArcanaRadioIndicator";

/**
 * `<ArcanaRadioCardGroup>` — React port. Reproduz `<div class="arcana-radio-card-group">`
 * (+ `--inline`/`--grid`/`--radio-end`/`--icon-end`), cada `<label class="arcana-radio-card">`
 * (+ `is-selected`/`is-disabled`), o `__input` nativo, `__radio`/`__dot`, `__icon`,
 * `__content`/`__label`/`__desc` e `__badge`, idêntico ao SFC.
 *
 * Posicionamento (puramente CSS, DOM inalterado):
 * - `radioPosition` — `'start'` (default) | `'end'`: lado do círculo do radio.
 * - `iconPosition` — `'start'` (default) | `'end'`: lado do chip do ícone. Em `'end'`
 *   o ícone vem depois do texto/badge, encostado na direita. Independente de
 *   `radioPosition` — as 4 permutações são suportadas.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 */
export interface RadioCardOption {
    label: string;
    value: string | number | boolean | null;
    description?: string;
    icon?: string;
    badge?: string;
    disabled?: boolean;
    iconBg?: string;
    iconColor?: string;
    iconBorder?: string;
}

export interface ArcanaRadioCardGroupProps {
    value?: string | number | boolean | null;
    options: RadioCardOption[];
    name?: string;
    ariaLabel?: string;
    disabled?: boolean;
    inline?: boolean;
    columns?: number;
    radioPosition?: "start" | "end";
    iconPosition?: "start" | "end";
    onValueChange?: (value: string | number | boolean | null) => void;
    onChange?: (value: string | number | boolean | null) => void;
    className?: string;
}

let uidCounter = 0;

export function ArcanaRadioCardGroup({
    value = null,
    options,
    name = "",
    ariaLabel = "",
    disabled = false,
    inline = false,
    columns = 0,
    radioPosition = "start",
    iconPosition = "start",
    onValueChange,
    onChange,
    className,
}: ArcanaRadioCardGroupProps) {
    const uid = useRef(++uidCounter);
    const groupName = name || `arcana-radio-card-group-${uid.current}`;
    const normalizedOptions = useMemo(() => options ?? [], [options]);

    const isSelected = (opt: RadioCardOption) => opt.value === value;
    const isOptionDisabled = (opt: RadioCardOption) =>
        Boolean(disabled || opt.disabled);

    const handleChange = (opt: RadioCardOption) => {
        if (isOptionDisabled(opt)) return;
        onValueChange?.(opt.value);
        onChange?.(opt.value);
    };

    const rootClasses = [
        "arcana-radio-card-group",
        inline && !columns ? "arcana-radio-card-group--inline" : "",
        columns > 0 ? "arcana-radio-card-group--grid" : "",
        radioPosition === "end" ? "arcana-radio-card-group--radio-end" : "",
        iconPosition === "end" ? "arcana-radio-card-group--icon-end" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const rootStyle: CSSProperties | undefined =
        columns > 0
            ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
            : undefined;

    return (
        <div
            className={rootClasses}
            style={rootStyle}
            role="radiogroup"
            aria-label={ariaLabel}
        >
            {normalizedOptions.map((opt) => (
                <label
                    key={String(opt.value)}
                    className={[
                        "arcana-radio-card",
                        isSelected(opt) ? "is-selected" : "",
                        isOptionDisabled(opt) ? "is-disabled" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <input
                        type="radio"
                        className="arcana-radio-card__input"
                        name={groupName}
                        value={String(opt.value)}
                        checked={isSelected(opt)}
                        disabled={isOptionDisabled(opt)}
                        onChange={() => handleChange(opt)}
                    />

                    <ArcanaRadioIndicator
                        checked={isSelected(opt)}
                        size="lg"
                        tone="solid"
                    />

                    {opt.icon ? (
                        <span
                            className="arcana-radio-card__icon"
                            style={{
                                background: opt.iconBg,
                                color: opt.iconColor,
                                border: opt.iconBorder
                                    ? `1px solid ${opt.iconBorder}`
                                    : undefined,
                            }}
                            aria-hidden="true"
                        >
                            <i className={opt.icon} />
                        </span>
                    ) : null}

                    <span className="arcana-radio-card__content">
                        <span className="arcana-radio-card__label">{opt.label}</span>
                        {opt.description ? (
                            <span className="arcana-radio-card__desc">
                                {opt.description}
                            </span>
                        ) : null}
                    </span>

                    {opt.badge ? (
                        <span className="arcana-radio-card__badge">{opt.badge}</span>
                    ) : null}
                </label>
            ))}
        </div>
    );
}
