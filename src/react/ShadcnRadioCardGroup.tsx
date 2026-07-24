import { useMemo, useRef, type CSSProperties } from "react";

/**
 * `<ShadcnRadioCardGroup>` — React port. Reproduz `<div class="shadcn-radio-card-group">`
 * (+ `--inline`/`--grid`/`--radio-end`), cada `<label class="shadcn-radio-card">`
 * (+ `is-selected`/`is-disabled`), o `__input` nativo, `__radio`/`__dot`, `__icon`,
 * `__content`/`__label`/`__desc` e `__badge`, idêntico ao SFC.
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

export interface ShadcnRadioCardGroupProps {
    value?: string | number | boolean | null;
    options: RadioCardOption[];
    name?: string;
    ariaLabel?: string;
    disabled?: boolean;
    inline?: boolean;
    columns?: number;
    radioPosition?: "start" | "end";
    onValueChange?: (value: string | number | boolean | null) => void;
    onChange?: (value: string | number | boolean | null) => void;
    className?: string;
}

let uidCounter = 0;

export function ShadcnRadioCardGroup({
    value = null,
    options,
    name = "",
    ariaLabel = "",
    disabled = false,
    inline = false,
    columns = 0,
    radioPosition = "start",
    onValueChange,
    onChange,
    className,
}: ShadcnRadioCardGroupProps) {
    const uid = useRef(++uidCounter);
    const groupName = name || `shadcn-radio-card-group-${uid.current}`;
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
        "shadcn-radio-card-group",
        inline && !columns ? "shadcn-radio-card-group--inline" : "",
        columns > 0 ? "shadcn-radio-card-group--grid" : "",
        radioPosition === "end" ? "shadcn-radio-card-group--radio-end" : "",
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
                        "shadcn-radio-card",
                        isSelected(opt) ? "is-selected" : "",
                        isOptionDisabled(opt) ? "is-disabled" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <input
                        type="radio"
                        className="shadcn-radio-card__input"
                        name={groupName}
                        value={String(opt.value)}
                        checked={isSelected(opt)}
                        disabled={isOptionDisabled(opt)}
                        onChange={() => handleChange(opt)}
                    />

                    <span className="shadcn-radio-card__radio" aria-hidden="true">
                        <span className="shadcn-radio-card__dot" />
                    </span>

                    {opt.icon ? (
                        <span
                            className="shadcn-radio-card__icon"
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

                    <span className="shadcn-radio-card__content">
                        <span className="shadcn-radio-card__label">{opt.label}</span>
                        {opt.description ? (
                            <span className="shadcn-radio-card__desc">
                                {opt.description}
                            </span>
                        ) : null}
                    </span>

                    {opt.badge ? (
                        <span className="shadcn-radio-card__badge">{opt.badge}</span>
                    ) : null}
                </label>
            ))}
        </div>
    );
}
