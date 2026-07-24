import type { KeyboardEvent, ReactNode } from "react";

/**
 * `<ShadcnSwitchCard>` — React port. Toggle full-width de alto impacto (card inverte
 * pra zinc-900 quando ativo). Reproduz `<button class="shadcn-switch-card">` (+ `is-on`,
 * `is-disabled`), o ícone (`__icon`), textos (`__text`/`__title`/`__status`) e o switch
 * visual interno custom (`__switch`/`__switch-thumb`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - slots `#icon`/`#title`/`#status` → props `iconNode`/`title`/`status` (ReactNode)
 */
export interface ShadcnSwitchCardProps {
    value?: boolean;
    title?: ReactNode;
    statusOn?: string;
    statusOff?: string;
    icon?: string;
    iconNode?: ReactNode;
    status?: ReactNode;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    className?: string;
}

export function ShadcnSwitchCard({
    value = false,
    title = "",
    statusOn = "ATIVO",
    statusOff = "DESLIGADO",
    icon = "",
    iconNode,
    status,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    className,
}: ShadcnSwitchCardProps) {
    const hasIcon = Boolean(icon) || Boolean(iconNode);
    const currentStatus = value ? statusOn : statusOff;
    const hasStatus = Boolean(currentStatus) || Boolean(status);

    const rootClasses = [
        "shadcn-switch-card",
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
        ariaLabel || (typeof title === "string" ? title : "") || undefined;

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
            {hasIcon ? (
                <span className="shadcn-switch-card__icon" aria-hidden="true">
                    {iconNode ?? (icon ? <i className={icon} /> : null)}
                </span>
            ) : null}

            <div className="shadcn-switch-card__text">
                <div className="shadcn-switch-card__title">{title}</div>
                {hasStatus ? (
                    <div className="shadcn-switch-card__status">
                        {status ?? currentStatus}
                    </div>
                ) : null}
            </div>

            <span className="shadcn-switch-card__switch" aria-hidden="true">
                <span className="shadcn-switch-card__switch-thumb" />
            </span>
        </button>
    );
}
