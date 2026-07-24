import type { ReactNode } from "react";

/**
 * `<ShadcnOnboardingPanel>` — React port do SFC Vue. Empty state / CTA panel para
 * primeiras configurações. Markup/classes `shadcn-onboarding*` idênticos ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children` (fallback: `description`)
 * - slot `#action` → prop `action` (ReactNode; substitui a CTA padrão)
 * - slot `#sub-hint` → prop `subHintSlot` (ReactNode; substitui o sub-hint padrão)
 * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
 */
export interface ShadcnOnboardingPanelProps {
    icon: string;
    title: string;
    description?: string;
    actionLabel?: string;
    actionIcon?: string;
    actionLoading?: boolean;
    secondaryActionLabel?: string;
    secondaryActionIcon?: string;
    subHint?: string;
    subHintIcon?: string;
    /** Substitui o slot default (descrição rica). */
    children?: ReactNode;
    /** Substitui o slot `#action` (botão custom). */
    action?: ReactNode;
    /** Substitui o slot `#sub-hint`. */
    subHintSlot?: ReactNode;
    onAction?: () => void;
    onSecondaryAction?: () => void;
}

export function ShadcnOnboardingPanel({
    icon,
    title,
    description = "",
    actionLabel = "",
    actionIcon = "fa-solid fa-plus",
    actionLoading = false,
    secondaryActionLabel = "",
    secondaryActionIcon = "",
    subHint = "",
    subHintIcon = "",
    children,
    action,
    subHintSlot,
    onAction,
    onSecondaryAction,
}: ShadcnOnboardingPanelProps) {
    const hasDescription = Boolean(children) || Boolean(description);
    const hasActionZone = Boolean(action || actionLabel || secondaryActionLabel);
    const hasSubHint = Boolean(subHintSlot || subHint);

    return (
        <div className="shadcn-onboarding">
            <div className="shadcn-onboarding__visual">
                <div className="shadcn-onboarding__ring" />
                <div className="shadcn-onboarding__ring shadcn-onboarding__ring--2" />
                <div className="shadcn-onboarding__icon">
                    <i className={icon} />
                </div>
            </div>

            <h3 className="shadcn-onboarding__title">{title}</h3>

            {hasDescription && (
                <p className="shadcn-onboarding__desc">{children ?? description}</p>
            )}

            {hasActionZone && (
                <div className="shadcn-onboarding__action">
                    {action ?? (
                        <>
                            {actionLabel && (
                                <button
                                    className="shadcn-onboarding__cta"
                                    disabled={actionLoading}
                                    onClick={() => onAction?.()}
                                >
                                    {actionLoading ? (
                                        <i className="fa-solid fa-spinner fa-spin" />
                                    ) : actionIcon ? (
                                        <i className={actionIcon} />
                                    ) : null}
                                    <span>{actionLabel}</span>
                                </button>
                            )}
                            {secondaryActionLabel && (
                                <button
                                    className="shadcn-onboarding__cta shadcn-onboarding__cta--secondary"
                                    onClick={() => onSecondaryAction?.()}
                                >
                                    {secondaryActionIcon && <i className={secondaryActionIcon} />}
                                    <span>{secondaryActionLabel}</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}

            {hasSubHint && (
                <p className="shadcn-onboarding__sub-hint">
                    {subHintSlot ?? (
                        <>
                            {subHintIcon && <i className={subHintIcon} />}
                            <span>{subHint}</span>
                        </>
                    )}
                </p>
            )}
        </div>
    );
}
