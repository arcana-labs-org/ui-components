import { useEffect, useRef, type CSSProperties } from "react";

/**
 * `<ShadcnSegmentedOptions>` — React port. Segmented control de N opções. Reproduz
 * `<div class="shadcn-segmented-options">` (+ `is-compact`/`is-squared`/`is-disabled`),
 * cada `<button class="shadcn-segmented-options__option">` (+ `is-active`), o
 * `__radio`/`__icon` opcionais e o `__empty`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - `--seg-active` inline style preservado
 */
export interface SegmentedOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: string;
}

export interface ShadcnSegmentedOptionsProps {
    value?: string | number | null;
    options?: SegmentedOption[];
    disabled?: boolean;
    compact?: boolean;
    squared?: boolean;
    activeColor?: string;
    radio?: boolean;
    autoSelectFirst?: boolean;
    ariaLabel?: string;
    emptyText?: string;
    onValueChange?: (value: string | number) => void;
    onChange?: (value: string | number) => void;
    className?: string;
}

export function ShadcnSegmentedOptions({
    value = null,
    options = [],
    disabled = false,
    compact = false,
    squared = false,
    activeColor = "",
    radio = false,
    autoSelectFirst = false,
    ariaLabel = "",
    emptyText = "Sem opções disponíveis",
    onValueChange,
    onChange,
    className,
}: ShadcnSegmentedOptionsProps) {
    const normalizedOptions = options ?? [];

    const select = (opt: SegmentedOption) => {
        if (disabled || opt.disabled || opt.value === value) return;
        onValueChange?.(opt.value);
        onChange?.(opt.value);
    };

    // `autoSelectFirst`: quando as options carregam e nada está selecionado,
    // seleciona a 1ª habilitada. Reproduz o watch(options)+mounted do SFC.
    const emit = useRef<(v: string | number) => void>(() => {});
    emit.current = (v: string | number) => {
        onValueChange?.(v);
        onChange?.(v);
    };
    useEffect(() => {
        if (!autoSelectFirst || disabled) return;
        const hasValue = value !== null && value !== undefined && value !== "";
        if (hasValue) return;
        const first = normalizedOptions.find((o) => !o.disabled);
        if (!first) return;
        emit.current(first.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, autoSelectFirst, disabled]);

    const rootClasses = [
        "shadcn-segmented-options",
        compact ? "is-compact" : "",
        squared ? "is-squared" : "",
        disabled ? "is-disabled" : "",
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
            role="radiogroup"
            aria-label={ariaLabel || undefined}
        >
            {normalizedOptions.map((opt) => (
                <button
                    key={String(opt.value)}
                    type="button"
                    className={[
                        "shadcn-segmented-options__option",
                        opt.value === value ? "is-active" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    role="radio"
                    aria-checked={opt.value === value}
                    disabled={disabled || opt.disabled}
                    onClick={() => select(opt)}
                >
                    {radio ? (
                        <span
                            className="shadcn-segmented-options__radio"
                            aria-hidden="true"
                        />
                    ) : null}
                    {opt.icon ? (
                        <i className={`shadcn-segmented-options__icon ${opt.icon}`} />
                    ) : null}
                    <span>{opt.label}</span>
                </button>
            ))}

            {!normalizedOptions.length ? (
                <span className="shadcn-segmented-options__empty">{emptyText}</span>
            ) : null}
        </div>
    );
}
