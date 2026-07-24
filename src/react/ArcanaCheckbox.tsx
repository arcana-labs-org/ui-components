import type { ReactNode } from "react";

/**
 * `<ArcanaCheckbox>` — React port. Reproduz o `<label class="arcana-checkbox">` com
 * `<input type="checkbox" class="arcana-checkbox__input">` NATIVO + a pintura
 * (`arcana-checkbox__box`/`__icon`/`__label`), idêntico ao SFC Vue.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` (controlado) + `onValueChange`
 * - `emit('change')` → `onChange` (mesmo booleano)
 * - slot default → `children` (fallback pro `label`)
 */
export interface ArcanaCheckboxProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    ariaLabel?: string;
    onValueChange?: (checked: boolean) => void;
    onChange?: (checked: boolean) => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaCheckbox({
    value = false,
    indeterminate = false,
    disabled = false,
    label = "",
    name = "",
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
    children,
}: ArcanaCheckboxProps) {
    const rootClasses = [
        "arcana-checkbox",
        value || indeterminate ? "arcana-checkbox--checked" : "",
        disabled ? "arcana-checkbox--disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = (checked: boolean) => {
        onValueChange?.(checked);
        onChange?.(checked);
    };

    return (
        <label className={rootClasses}>
            <input
                type="checkbox"
                className="arcana-checkbox__input"
                checked={value}
                disabled={disabled}
                name={name || undefined}
                aria-label={ariaLabel || undefined}
                onChange={(e) => handleChange(e.target.checked)}
            />

            <span className="arcana-checkbox__box" aria-hidden="true">
                {indeterminate ? (
                    <i className="fa-solid fa-minus arcana-checkbox__icon" />
                ) : value ? (
                    <i className="fa-solid fa-check arcana-checkbox__icon" />
                ) : null}
            </span>

            {label || children ? (
                <span className="arcana-checkbox__label">{children ?? label}</span>
            ) : null}
        </label>
    );
}
