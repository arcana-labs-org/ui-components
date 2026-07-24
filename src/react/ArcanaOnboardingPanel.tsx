import type { ReactNode } from "react";
import { ArcanaButton } from "./ArcanaButton";

/**
 * `<ArcanaOnboardingPanel>` — React port do SFC Vue. Empty state / CTA panel para
 * primeiras configurações. Markup/classes `arcana-onboarding*` idênticos ao SFC.
 *
 * Equivalências Vue → React:
 * - slot default → `children` (fallback: `description`)
 * - slot `#action` → prop `action` (ReactNode; substitui a CTA padrão)
 * - slot `#sub-hint` → prop `subHintSlot` (ReactNode; substitui o sub-hint padrão)
 * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
 */
export interface ArcanaOnboardingPanelProps {
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

export function ArcanaOnboardingPanel({
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
}: ArcanaOnboardingPanelProps) {
    const hasDescription = Boolean(children) || Boolean(description);
    const hasActionZone = Boolean(action || actionLabel || secondaryActionLabel);
    const hasSubHint = Boolean(subHintSlot || subHint);

    return (
        <div className="arcana-onboarding">
            <div className="arcana-onboarding__visual">
                <div className="arcana-onboarding__ring" />
                <div className="arcana-onboarding__ring arcana-onboarding__ring--2" />
                <div className="arcana-onboarding__icon">
                    <i className={icon} />
                </div>
            </div>

            <h3 className="arcana-onboarding__title">{title}</h3>

            {hasDescription && (
                <p className="arcana-onboarding__desc">{children ?? description}</p>
            )}

            {hasActionZone && (
                <div className="arcana-onboarding__action">
                    {action ?? (
                        <>
                            {actionLabel && (
                                <ArcanaButton
                                    variant="primary"
                                    disabled={actionLoading}
                                    onClick={onAction}
                                >
                                    {actionLoading ? (
                                        <i className="fa-solid fa-spinner fa-spin" />
                                    ) : actionIcon ? (
                                        <i className={actionIcon} />
                                    ) : null}{" "}
                                    {actionLabel}
                                </ArcanaButton>
                            )}
                            {secondaryActionLabel && (
                                <ArcanaButton
                                    variant="outline"
                                    onClick={onSecondaryAction}
                                >
                                    {secondaryActionIcon && <i className={secondaryActionIcon} />}{" "}
                                    {secondaryActionLabel}
                                </ArcanaButton>
                            )}
                        </>
                    )}
                </div>
            )}

            {hasSubHint && (
                <p className="arcana-onboarding__sub-hint">
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
