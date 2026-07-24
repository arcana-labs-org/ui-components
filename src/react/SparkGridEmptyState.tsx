import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShadcnOnboardingPanel } from "./ShadcnOnboardingPanel";

/**
 * `<SparkGridEmptyState>` — React port do SFC Vue. Mostra o `<ShadcnOnboardingPanel>`
 * apenas quando a grid terminou de carregar e está genuinamente vazia (sem filtro).
 * Markup/classes `spark-grid-empty-state` idênticos ao SFC.
 *
 * Equivalências Vue → React:
 * - `watch(loading)` que arma `loaded` no primeiro `true → false` → `useEffect` + ref
 * - `computed(showPanel)` → derivação local
 * - `emit('panel-visible')` → `onPanelVisible` (disparado quando o painel aparece/some)
 * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
 * - slot default (conteúdo real quando NÃO vazio) → `children`
 */
export interface SparkGridEmptyStateProps {
    total: number;
    loading: boolean;
    filtered: boolean;
    icon: string;
    title: string;
    description?: string;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryActionIcon?: string;
    subHint?: string;
    children?: ReactNode;
    onAction?: () => void;
    onSecondaryAction?: () => void;
    onPanelVisible?: (visible: boolean) => void;
}

export function SparkGridEmptyState({
    total,
    loading,
    filtered,
    icon,
    title,
    description = "",
    actionLabel,
    secondaryActionLabel = "",
    secondaryActionIcon = "",
    subHint = "",
    children,
    onAction,
    onSecondaryAction,
    onPanelVisible,
}: SparkGridEmptyStateProps) {
    // Arma `loaded` no primeiro flip `loading: true → false` (mesma lógica do watch do SFC).
    const [loaded, setLoaded] = useState(false);
    const prevLoadingRef = useRef(loading);
    useEffect(() => {
        if (prevLoadingRef.current === true && loading === false) {
            setLoaded(true);
        }
        prevLoadingRef.current = loading;
    }, [loading]);

    const showPanel = loaded && !loading && total === 0 && !filtered;

    // Notifica o pai quando o painel aparece/some (immediate: true no SFC → dispara no mount também).
    const prevShowRef = useRef<boolean | null>(null);
    useEffect(() => {
        if (prevShowRef.current !== showPanel) {
            prevShowRef.current = showPanel;
            onPanelVisible?.(showPanel);
        }
    }, [showPanel, onPanelVisible]);

    return (
        <div className="spark-grid-empty-state">
            <div style={{ display: showPanel ? "none" : undefined }}>{children}</div>
            {showPanel && (
                <ShadcnOnboardingPanel
                    icon={icon}
                    title={title}
                    description={description}
                    actionLabel={actionLabel}
                    secondaryActionLabel={secondaryActionLabel}
                    secondaryActionIcon={secondaryActionIcon}
                    subHint={subHint}
                    onAction={() => onAction?.()}
                    onSecondaryAction={() => onSecondaryAction?.()}
                />
            )}
        </div>
    );
}
