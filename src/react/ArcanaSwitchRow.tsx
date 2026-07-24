import type { KeyboardEvent, ReactNode } from "react";
import { ArcanaSwitch } from "./ArcanaSwitch";

/**
 * `<ArcanaSwitchRow>` — React port. Toggle full-width "linha de configuração".
 * Reproduz o `<button class="arcana-switch-row">` (+ `is-on`, `is-disabled`), os textos
 * (`__text`/`__title`/`__sub`) e o `<ArcanaSwitch class="arcana-switch-row__switch">`
 * interno (aria-hidden, sem click próprio), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - slots `#label`/`#description` → props `label`/`description` (ReactNode)
 */
export interface ArcanaSwitchRowProps {
    value?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    className?: string;
}

export function ArcanaSwitchRow({
    value = false,
    label = "",
    description,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
}: ArcanaSwitchRowProps) {
    const hasDescription = Boolean(description);

    const rootClasses = [
        "arcana-switch-row",
        value ? "is-on" : "",
        disabled ? "is-disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const toggle = () => {
        if (disabled) return;
        const next = !value;
        onValueChange?.(next);
        onChange?.(next);
    };

    const onKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
        }
    };

    const ariaLabelText =
        ariaLabel || (typeof label === "string" ? label : "") || undefined;

    return (
        <button
            type="button"
            className={rootClasses}
            role="switch"
            aria-checked={Boolean(value)}
            aria-label={ariaLabelText}
            disabled={disabled}
            onClick={toggle}
            onKeyDown={onKeydown}
        >
            <div className="arcana-switch-row__text">
                <div className="arcana-switch-row__title">{label}</div>
                {hasDescription ? (
                    <div className="arcana-switch-row__sub">{description}</div>
                ) : null}
            </div>

            <ArcanaSwitch
                className="arcana-switch-row__switch"
                value={Boolean(value)}
                disabled={disabled}
                tabIndex={-1}
                aria-hidden={true}
            />
        </button>
    );
}
