import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
} from "react";

/**
 * `<ShadcnTabs>` — React port do SFC Vue. Reproduz o mesmo markup/classes:
 * `shadcn-tabs` (+ `--${variant}`, `--${orientation}`, `--flush`), `shadcn-tabs__list`,
 * `shadcn-tabs__trigger` (+ `is-active`/`is-disabled`/`is-tone-*`), `__trigger-icon`,
 * `__trigger-label`, `__trigger-badge`, `__group-header` e `shadcn-tabs__panel`.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - slots nomeados (um por `tab.name`) → prop `panels` (mapa name → ReactNode) ou
 *   `renderPanel(tab)`; `#list-header` → prop `listHeader`
 *
 * Nota: `tooltipPlacement` do SFC usa `<el-tooltip>` (Element Plus, Vue-only) — o port
 * React renderiza os triggers SEM o wrapper de tooltip (o markup do `<button>` é idêntico).
 * A prop é aceita mas ignorada nesta fase.
 */

export interface ShadcnTabItem {
    name: string | number;
    label: string;
    disabled?: boolean;
    icon?: string;
    iconColor?: string;
    badge?: string | number;
    group?: string;
    tone?: "default" | "danger";
    eager?: boolean;
}

export type ShadcnTabsVariant =
    | "pills"
    | "underline"
    | "boxed"
    | "sidebar"
    | "sidebar-soft"
    | "sidebar-shell"
    | "segmented";

export interface ShadcnTabsProps {
    value: string | number;
    tabs: ShadcnTabItem[];
    variant?: ShadcnTabsVariant;
    orientation?: "horizontal" | "vertical";
    ariaLabel?: string;
    keepAlive?: boolean;
    flush?: boolean;
    /** Aceita, mas não renderiza tooltip (dependência el-tooltip é Vue-only). */
    tooltipPlacement?: string;
    onValueChange?: (name: string | number) => void;
    onChange?: (name: string | number) => void;
    /** Mapa `tab.name` → conteúdo do painel (equivale aos slots nomeados do Vue). */
    panels?: Record<string, ReactNode>;
    /** Alternativa a `panels`: render function por tab. */
    renderPanel?: (tab: ShadcnTabItem) => ReactNode;
    /** Equivale ao slot `#list-header`. */
    listHeader?: ReactNode;
    className?: string;
}

type RenderableItem =
    | { type: "header"; label: string; key: string }
    | { type: "tab"; tab: ShadcnTabItem; key: string };

let uidCounter = 0;

export function ShadcnTabs({
    value,
    tabs,
    variant = "pills",
    orientation = "horizontal",
    ariaLabel = "",
    keepAlive = false,
    flush = false,
    tooltipPlacement = "",
    onValueChange,
    onChange,
    panels,
    renderPanel,
    listHeader,
    className,
}: ShadcnTabsProps) {
    void tooltipPlacement;
    const uidRef = useRef<number>(0);
    if (uidRef.current === 0) uidRef.current = ++uidCounter;
    const uid = uidRef.current;

    const normalizedTabs = tabs ?? [];
    const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // keepAlive LAZY: nomes de tabs já visitadas ao menos uma vez.
    const [activatedTabNames, setActivatedTabNames] = useState<string[]>(() =>
        value != null && value !== "" ? [String(value)] : []
    );

    useEffect(() => {
        const name = value == null ? "" : String(value);
        if (name && !activatedTabNames.includes(name)) {
            setActivatedTabNames((prev) => [...prev, name]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const isSidebarLike =
        variant === "sidebar" || variant === "sidebar-soft" || variant === "sidebar-shell";
    const effectiveOrientation = isSidebarLike ? "vertical" : orientation;

    const rootClasses = [
        `shadcn-tabs--${variant}`,
        `shadcn-tabs--${effectiveOrientation}`,
        flush ? "shadcn-tabs--flush" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const showsGroupHeaders =
        variant === "sidebar-soft" || variant === "sidebar-shell";

    const isActive = (tab: ShadcnTabItem) => tab.name === value;
    const isDisabled = (tab: ShadcnTabItem) => Boolean(tab.disabled);
    const wasActivated = (tab: ShadcnTabItem) =>
        Boolean(tab.eager) || activatedTabNames.includes(String(tab.name));
    const triggerId = (tab: ShadcnTabItem) =>
        `shadcn-tabs-${uid}-trigger-${String(tab.name)}`;
    const panelId = (tab: ShadcnTabItem) =>
        `shadcn-tabs-${uid}-panel-${String(tab.name)}`;
    const activeTab = normalizedTabs.find((t) => t.name === value) ?? null;

    const panelContent = (tab: ShadcnTabItem): ReactNode => {
        if (renderPanel) return renderPanel(tab);
        return panels?.[String(tab.name)] ?? null;
    };

    const renderableItems: RenderableItem[] = (() => {
        if (!showsGroupHeaders) {
            return normalizedTabs.map((t) => ({
                type: "tab" as const,
                tab: t,
                key: String(t.name),
            }));
        }
        const out: RenderableItem[] = [];
        let currentGroup: string | null = null;
        for (const tab of normalizedTabs) {
            const tabGroup = tab.group ?? null;
            if (tabGroup && tabGroup !== currentGroup) {
                out.push({ type: "header", label: tabGroup, key: `__group__${tabGroup}` });
                currentGroup = tabGroup;
            } else if (!tabGroup) {
                currentGroup = null;
            }
            out.push({ type: "tab", tab, key: String(tab.name) });
        }
        return out;
    })();

    const select = (tab: ShadcnTabItem) => {
        if (isDisabled(tab) || isActive(tab)) return;
        onValueChange?.(tab.name);
        onChange?.(tab.name);
    };

    const focusTrigger = (tab: ShadcnTabItem) => {
        const tabIdx = normalizedTabs.findIndex((t) => t.name === tab.name);
        // nextTick equivalente — deixa o React aplicar o novo `value` antes de focar.
        requestAnimationFrame(() => {
            triggerRefs.current[tabIdx]?.focus?.();
        });
    };

    const onKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
        const enabledTabs = normalizedTabs.filter((t) => !isDisabled(t));
        if (!enabledTabs.length) return;

        const currentIdx = enabledTabs.findIndex((t) => t.name === value);
        const isVertical =
            variant === "sidebar" ||
            variant === "sidebar-soft" ||
            variant === "sidebar-shell" ||
            orientation === "vertical";

        const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
        const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

        if (e.key === nextKey) {
            e.preventDefault();
            const next = enabledTabs[(currentIdx + 1) % enabledTabs.length];
            select(next);
            focusTrigger(next);
            return;
        }
        if (e.key === prevKey) {
            e.preventDefault();
            const prev =
                enabledTabs[(currentIdx - 1 + enabledTabs.length) % enabledTabs.length];
            select(prev);
            focusTrigger(prev);
            return;
        }
        if (e.key === "Home") {
            e.preventDefault();
            select(enabledTabs[0]);
            focusTrigger(enabledTabs[0]);
            return;
        }
        if (e.key === "End") {
            e.preventDefault();
            select(enabledTabs[enabledTabs.length - 1]);
            focusTrigger(enabledTabs[enabledTabs.length - 1]);
        }
    };

    // Índice do trigger dentro de `normalizedTabs` (refs 1:1 com tabs, headers usam <div>).
    const triggerIndexOf = (tab: ShadcnTabItem) =>
        normalizedTabs.findIndex((t) => t.name === tab.name);

    return (
        <div className={["shadcn-tabs", rootClasses, className ?? ""].filter(Boolean).join(" ")}>
            <div
                className="shadcn-tabs__list"
                role="tablist"
                aria-label={ariaLabel || undefined}
                onKeyDown={onKeydown}
            >
                {listHeader}

                {renderableItems.map((item) =>
                    item.type === "header" ? (
                        <div
                            key={item.key}
                            className="shadcn-tabs__group-header"
                            role="presentation"
                        >
                            {item.label}
                        </div>
                    ) : (
                        <button
                            key={item.key}
                            ref={(el) => {
                                triggerRefs.current[triggerIndexOf(item.tab)] = el;
                            }}
                            type="button"
                            className={[
                                "shadcn-tabs__trigger",
                                isActive(item.tab) ? "is-active" : "",
                                isDisabled(item.tab) ? "is-disabled" : "",
                                item.tab.tone ? `is-tone-${item.tab.tone}` : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            role="tab"
                            id={triggerId(item.tab)}
                            aria-selected={isActive(item.tab)}
                            aria-controls={panelId(item.tab)}
                            aria-disabled={isDisabled(item.tab)}
                            tabIndex={isActive(item.tab) ? 0 : -1}
                            disabled={isDisabled(item.tab)}
                            onClick={() => select(item.tab)}
                        >
                            {item.tab.icon ? (
                                <i
                                    className={`shadcn-tabs__trigger-icon ${item.tab.icon}`}
                                    style={
                                        item.tab.iconColor
                                            ? ({ color: item.tab.iconColor } as CSSProperties)
                                            : undefined
                                    }
                                />
                            ) : null}
                            <span className="shadcn-tabs__trigger-label">{item.tab.label}</span>
                            {item.tab.badge != null ? (
                                <span className="shadcn-tabs__trigger-badge">
                                    {item.tab.badge}
                                </span>
                            ) : null}
                        </button>
                    )
                )}
            </div>

            {keepAlive ? (
                <>
                    {normalizedTabs.map((tab) =>
                        wasActivated(tab) ? (
                            <div
                                key={String(tab.name)}
                                className="shadcn-tabs__panel"
                                role="tabpanel"
                                id={panelId(tab)}
                                aria-labelledby={triggerId(tab)}
                                tabIndex={isActive(tab) ? 0 : -1}
                                hidden={!isActive(tab) || undefined}
                                style={isActive(tab) ? undefined : { display: "none" }}
                            >
                                {panelContent(tab)}
                            </div>
                        ) : null
                    )}
                </>
            ) : activeTab ? (
                <div
                    className="shadcn-tabs__panel"
                    role="tabpanel"
                    id={panelId(activeTab)}
                    aria-labelledby={triggerId(activeTab)}
                    tabIndex={0}
                >
                    {panelContent(activeTab)}
                </div>
            ) : null}
        </div>
    );
}
