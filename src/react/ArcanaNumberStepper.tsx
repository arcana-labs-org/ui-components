import type { ChangeEvent, KeyboardEvent } from "react";

/**
 * `<ArcanaNumberStepper>` — React port. Reproduz `<div class="arcana-number-stepper">`
 * (+ `is-disabled`), os `__btn--decrement`/`__btn--increment` e o `__input`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 */
export interface ArcanaNumberStepperProps {
    value?: number | string | null;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: number | null) => void;
    onChange?: (value: number) => void;
    className?: string;
}

export function ArcanaNumberStepper({
    value = 0,
    min = 0,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
}: ArcanaNumberStepperProps) {
    const currentValue = (() => {
        const n = Number(value);
        return Number.isFinite(n) ? n : min;
    })();

    const cannotDecrement = disabled || currentValue <= min;
    const cannotIncrement = disabled || currentValue >= max;

    const clamp = (v: number) => Math.min(max, Math.max(min, v));

    const emitValue = (v: number) => {
        const clamped = clamp(v);
        onValueChange?.(clamped);
        onChange?.(clamped);
    };

    const increment = () => {
        if (cannotIncrement) return;
        emitValue(currentValue + step);
    };

    const decrement = () => {
        if (cannotDecrement) return;
        emitValue(currentValue - step);
    };

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw === "") {
            onValueChange?.(null);
            return;
        }
        const n = Number(raw);
        if (Number.isFinite(n)) emitValue(n);
    };

    const onBlur = () => {
        const n = Number(value);
        const final = Number.isFinite(n) ? clamp(n) : min;
        if (final !== Number(value)) {
            onValueChange?.(final);
            onChange?.(final);
        }
    };

    const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            increment();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            decrement();
        }
    };

    const rootClasses = [
        "arcana-number-stepper",
        disabled ? "is-disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses}>
            <button
                type="button"
                className="arcana-number-stepper__btn arcana-number-stepper__btn--decrement"
                disabled={cannotDecrement}
                aria-label={"Diminuir " + (ariaLabel || "valor")}
                onClick={decrement}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>

            <input
                type="number"
                className="arcana-number-stepper__input"
                value={value ?? ""}
                min={min}
                max={Number.isFinite(max) ? max : undefined}
                step={step}
                disabled={disabled}
                aria-label={ariaLabel || undefined}
                onChange={onInput}
                onBlur={onBlur}
                onKeyDown={onKeydown}
            />

            <button
                type="button"
                className="arcana-number-stepper__btn arcana-number-stepper__btn--increment"
                disabled={cannotIncrement}
                aria-label={"Aumentar " + (ariaLabel || "valor")}
                onClick={increment}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
}
