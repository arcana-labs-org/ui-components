import type { KeyboardEvent } from "react";

/**
 * `<ArcanaSwitch>` — React port. Reproduz o `<button role="switch" class="arcana-switch">`
 * (+ `arcana-switch--${size}`, `is-checked`, `is-disabled`), o `span.arcana-switch__thumb`
 * e o `<input class="arcana-switch__hidden-input">` opcional (quando `name`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` (controlado) + `onValueChange`
 * - `emit('change')` → `onChange`
 */
export interface ArcanaSwitchProps {
    value?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    name?: string;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    className?: string;
    /** Reproduz `tabindex`/`aria-hidden` que o ArcanaSwitchRow passa ao switch interno. */
    tabIndex?: number;
    "aria-hidden"?: boolean;
}

export function ArcanaSwitch({
    value = false,
    disabled = false,
    size = "md",
    name = "",
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
    tabIndex,
    "aria-hidden": ariaHidden,
}: ArcanaSwitchProps) {
    const isChecked = Boolean(value);

    const rootClasses = [
        "arcana-switch",
        `arcana-switch--${size}`,
        isChecked ? "is-checked" : "",
        disabled ? "is-disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const toggle = () => {
        if (disabled) return;
        const next = !isChecked;
        onValueChange?.(next);
        onChange?.(next);
    };

    const onKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
        }
    };

    return (
        <button
            type="button"
            role="switch"
            className={rootClasses}
            aria-checked={isChecked}
            aria-label={ariaLabel || undefined}
            aria-hidden={ariaHidden}
            disabled={disabled}
            tabIndex={tabIndex}
            onClick={toggle}
            onKeyDown={onKeydown}
        >
            <span className="arcana-switch__thumb" aria-hidden="true" />

            {name ? (
                <input
                    type="checkbox"
                    className="arcana-switch__hidden-input"
                    name={name}
                    checked={isChecked}
                    disabled={disabled}
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    onClick={(e) => e.stopPropagation()}
                />
            ) : null}
        </button>
    );
}
