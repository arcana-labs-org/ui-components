import type { ReactNode } from "react";

/**
 * `<ShadcnCheckbox>` — React port. Reproduz o `<label class="shadcn-checkbox">` com
 * `<input type="checkbox" class="shadcn-checkbox__input">` NATIVO + a pintura
 * (`shadcn-checkbox__box`/`__icon`/`__label`), idêntico ao SFC Vue.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` (controlado) + `onValueChange`
 * - `emit('change')` → `onChange` (mesmo booleano)
 * - slot default → `children` (fallback pro `label`)
 */
export interface ShadcnCheckboxProps {
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

export function ShadcnCheckbox({
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
}: ShadcnCheckboxProps) {
    const rootClasses = [
        "shadcn-checkbox",
        value || indeterminate ? "shadcn-checkbox--checked" : "",
        disabled ? "shadcn-checkbox--disabled" : "",
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
                className="shadcn-checkbox__input"
                checked={value}
                disabled={disabled}
                name={name || undefined}
                aria-label={ariaLabel || undefined}
                onChange={(e) => handleChange(e.target.checked)}
            />

            <span className="shadcn-checkbox__box" aria-hidden="true">
                {indeterminate ? (
                    <i className="fa-solid fa-minus shadcn-checkbox__icon" />
                ) : value ? (
                    <i className="fa-solid fa-check shadcn-checkbox__icon" />
                ) : null}
            </span>

            {label || children ? (
                <span className="shadcn-checkbox__label">{children ?? label}</span>
            ) : null}
        </label>
    );
}
