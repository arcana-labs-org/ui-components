import {
    useCallback as useCb,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/**
 * `<ArcanaMultiSelectPopover>` — React port. Popover genérico com tabs configuráveis e
 * multi-seleção via checkbox. Reproduz `<div class="msp">`, o `.msp-trigger`
 * default (customizável via `renderTrigger`), o painel teleportado (`.msp-panel`,
 * `.msp-segmented`/`.msp-seg`, `.msp-search-wrap`/`.msp-search`, `.msp-list`/`.msp-item`,
 * `.msp-footer`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change'|'open'|'close')`
 *   → `onChange`/`onOpen`/`onClose`
 * - slot `#trigger` → prop `renderTrigger({ open, toggle, isOpen, summary, isEmpty, selectedCount })`
 * - slot `#item` → prop `renderItem({ item, tab, selected })`
 * - `<Teleport>`/`<transition>` → `createPortal` (fade omitido)
 */
export interface MultiSelectTab {
    key: string;
    label: string;
    icon?: string;
    placeholder?: string;
    fetch: () => Promise<any[]>;
    searchFields?: string[];
    countLabel?: string;
}

export interface MultiSelectTriggerContext {
    open: () => void;
    toggle: () => void;
    isOpen: boolean;
    summary: string;
    isEmpty: boolean;
    selectedCount: number;
}

export interface ArcanaMultiSelectPopoverProps {
    value?: Record<string, number[]>;
    tabs: MultiSelectTab[];
    emptyLabel?: string;
    triggerIcon?: string;
    defaultTab?: string;
    onValueChange?: (value: Record<string, number[]>) => void;
    onChange?: (value: Record<string, number[]>) => void;
    onOpen?: () => void;
    onClose?: () => void;
    renderTrigger?: (ctx: MultiSelectTriggerContext) => ReactNode;
    renderItem?: (args: {
        item: any;
        tab?: MultiSelectTab;
        selected: boolean;
    }) => ReactNode;
    className?: string;
}

export function ArcanaMultiSelectPopover({
    value = {},
    tabs,
    emptyLabel = "Selecionar…",
    triggerIcon = "fa-solid fa-list-check",
    defaultTab = "",
    onValueChange,
    onChange,
    onOpen,
    onClose,
    renderTrigger,
    renderItem,
    className,
}: ArcanaMultiSelectPopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeKey, setActiveKey] = useState<string>("");
    const [search, setSearch] = useState("");
    const [cache, setCache] = useState<Record<string, any[]>>({});
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

    const rootRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const loadingRef = useRef<Record<string, boolean>>({});
    const loadedRef = useRef<Record<string, boolean>>({});
    const [loadingKey, setLoadingKey] = useState<string | null>(null);

    // Inicializa/normaliza a aba ativa quando `tabs` muda (watch immediate do SFC).
    useEffect(() => {
        if (!activeKey || !tabs.find((t) => t.key === activeKey)) {
            setActiveKey(defaultTab || tabs[0]?.key || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabs, defaultTab]);

    const activeTab = tabs.find((t) => t.key === activeKey);
    const items = cache[activeKey] ?? [];
    const loading = Boolean(loadingKey === activeKey);

    const filteredItems = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return items;
        const fields = activeTab?.searchFields ?? ["name"];
        return items.filter((it: any) => {
            for (const f of fields) {
                const v = it?.[f];
                if (typeof v === "string" && v.toLowerCase().includes(term))
                    return true;
            }
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, items, activeTab]);

    const selectedIdsForActive = (value?.[activeKey] ?? []) as number[];

    const selectedCount = tabs.reduce(
        (acc, t) => acc + (value?.[t.key] ?? []).length,
        0
    );
    const isEmpty = selectedCount === 0;

    const summary = useMemo(() => {
        if (selectedCount === 0) return emptyLabel;
        const names: string[] = [];
        for (const tab of tabs) {
            const ids = (value?.[tab.key] ?? []) as number[];
            if (!ids.length) continue;
            const list = cache[tab.key] ?? [];
            for (const id of ids) {
                const found = list.find((x: any) => x.id === id);
                if (found?.name) names.push(found.name);
            }
        }
        if (names.length === 0) return `${selectedCount} selecionado(s)`;
        const visible = names.slice(0, 2);
        const rest = selectedCount - visible.length;
        return rest > 0 ? `${visible.join(", ")}, +${rest}` : visible.join(", ");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCount, tabs, value, cache, emptyLabel]);

    const footerSummary = (() => {
        const parts: string[] = [];
        for (const tab of tabs) {
            const count = (value?.[tab.key] ?? []).length;
            if (!count) continue;
            const label = tab.countLabel ?? tab.label.toLowerCase();
            parts.push(`${count} ${label}`);
        }
        return parts.join(", ") + " selecionado(s)";
    })();

    const positionPanel = useCb(() => {
        const root = rootRef.current;
        const trigger = root?.firstElementChild as HTMLElement | undefined;
        const panel = panelRef.current;
        if (!trigger || !panel) return;

        const tRect = trigger.getBoundingClientRect();
        const pRect = panel.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const margin = 8;
        const offset = 4;

        let top = tRect.bottom + offset;
        if (top + pRect.height > vh - margin) {
            const flipped = tRect.top - pRect.height - offset;
            if (flipped >= margin) top = flipped;
        }

        const width = Math.max(tRect.width, 280);
        let left = tRect.left;
        if (left + width > vw - margin) left = Math.max(margin, vw - width - margin);

        setPanelStyle({ top: `${top}px`, left: `${left}px`, width: `${width}px` });
    }, []);

    const ensureLoaded = useCb(
        async (key: string) => {
            if (loadedRef.current[key] || loadingRef.current[key]) return;
            const tab = tabs.find((t) => t.key === key);
            if (!tab) return;
            loadingRef.current[key] = true;
            setLoadingKey(key);
            try {
                const result = await tab.fetch();
                const data = Array.isArray(result)
                    ? result
                    : (result as any)?.data ?? [];
                setCache((prev) => ({ ...prev, [key]: data }));
                loadedRef.current[key] = true;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(
                    `[multi-select-popover] erro ao carregar tab "${key}"`,
                    e
                );
            } finally {
                loadingRef.current[key] = false;
                setLoadingKey((cur) => (cur === key ? null : cur));
            }
        },
        [tabs]
    );

    const close = useCb(() => {
        setIsOpen(false);
        setSearch("");
        onClose?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose]);

    const open = useCb(async () => {
        if (!activeKey) return;
        setIsOpen(true);
        onOpen?.();
        await Promise.all(tabs.map((t) => ensureLoaded(t.key)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeKey, tabs, ensureLoaded, onOpen]);

    const toggle = () => {
        if (isOpen) close();
        else void open();
    };

    // Listeners globais + posicionamento + foco quando aberto.
    useEffect(() => {
        if (!isOpen) return;
        positionPanel();

        const handleOutsideClick = (e: MouseEvent) => {
            const root = rootRef.current;
            const panel = panelRef.current;
            if (!root) return;
            const target = e.target as Node;
            if (root.contains(target)) return;
            if (panel?.contains(target)) return;
            close();
        };
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                close();
            }
        };

        document.addEventListener("click", handleOutsideClick, true);
        document.addEventListener("keydown", handleKeydown);
        window.addEventListener("resize", positionPanel);
        window.addEventListener("scroll", positionPanel, true);

        requestAnimationFrame(() => searchRef.current?.focus());

        return () => {
            document.removeEventListener("click", handleOutsideClick, true);
            document.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("resize", positionPanel);
            window.removeEventListener("scroll", positionPanel, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const setActive = async (key: string) => {
        if (activeKey === key) return;
        setActiveKey(key);
        setSearch("");
        await ensureLoaded(key);
    };

    const isSelected = (id: number) => selectedIdsForActive.includes(id);

    const emitValue = (next: Record<string, number[]>) => {
        onValueChange?.(next);
        onChange?.(next);
    };

    const toggleItem = (id: number) => {
        const next: Record<string, number[]> = { ...(value || {}) };
        const arr = [...(next[activeKey] ?? [])];
        const idx = arr.indexOf(id);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(id);
        next[activeKey] = arr;
        emitValue(next);
    };

    const clearActive = () => {
        const next: Record<string, number[]> = { ...(value || {}) };
        next[activeKey] = [];
        emitValue(next);
    };

    const triggerCtx: MultiSelectTriggerContext = {
        open: () => void open(),
        toggle,
        isOpen,
        summary,
        isEmpty,
        selectedCount,
    };

    return (
        <div className={["msp", className ?? ""].filter(Boolean).join(" ")} ref={rootRef}>
            {renderTrigger ? (
                renderTrigger(triggerCtx)
            ) : (
                <button
                    type="button"
                    className={[
                        "msp-trigger",
                        isOpen ? "msp-trigger--open" : "",
                        isEmpty ? "msp-trigger--empty" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onClick={toggle}
                >
                    <i className={`${triggerIcon} msp-trigger__icon`} />
                    <span className="msp-trigger__summary">{summary}</span>
                    <i className="fa-solid fa-chevron-down msp-trigger__chevron" />
                </button>
            )}

            {isOpen
                ? createPortal(
                      <div
                          ref={panelRef}
                          className="msp-panel"
                          style={panelStyle}
                          onClick={(e) => e.stopPropagation()}
                      >
                          {tabs.length > 1 ? (
                              <div className="msp-segmented">
                                  {tabs.map((t) => (
                                      <button
                                          key={t.key}
                                          type="button"
                                          className={[
                                              "msp-seg",
                                              activeKey === t.key ? "msp-seg--active" : "",
                                          ]
                                              .filter(Boolean)
                                              .join(" ")}
                                          onClick={() => void setActive(t.key)}
                                      >
                                          {t.icon ? <i className={t.icon} /> : null}
                                          {t.label}
                                      </button>
                                  ))}
                              </div>
                          ) : null}

                          <div className="msp-search-wrap">
                              <i className="fa-solid fa-magnifying-glass msp-search-icon" />
                              <input
                                  ref={searchRef}
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                  type="text"
                                  className="msp-search"
                                  placeholder={
                                      activeTab?.placeholder ||
                                      `Buscar ${activeTab?.label?.toLowerCase() ?? ""}…`
                                  }
                              />
                          </div>

                          {loading ? (
                              <div className="msp-empty">Carregando…</div>
                          ) : filteredItems.length === 0 ? (
                              <div className="msp-empty">Nenhum item encontrado</div>
                          ) : (
                              <div className="msp-list">
                                  {filteredItems.map((item: any) => (
                                      <div
                                          key={`item-${activeKey}-${item.id}`}
                                          className={[
                                              "msp-item",
                                              isSelected(item.id)
                                                  ? "msp-item--selected"
                                                  : "",
                                          ]
                                              .filter(Boolean)
                                              .join(" ")}
                                          onClick={() => toggleItem(item.id)}
                                      >
                                          <span className="msp-check">
                                              {isSelected(item.id) ? (
                                                  <i className="fa-solid fa-check" />
                                              ) : null}
                                          </span>
                                          {renderItem ? (
                                              renderItem({
                                                  item,
                                                  tab: activeTab,
                                                  selected: isSelected(item.id),
                                              })
                                          ) : (
                                              <span className="msp-item__name">
                                                  {item.name}
                                              </span>
                                          )}
                                      </div>
                                  ))}
                              </div>
                          )}

                          {selectedCount > 0 ? (
                              <div className="msp-footer">
                                  <span className="msp-footer__count">
                                      {footerSummary}
                                  </span>
                                  <button
                                      type="button"
                                      className="msp-footer__clear"
                                      onClick={clearActive}
                                  >
                                      Limpar
                                  </button>
                              </div>
                          ) : null}
                      </div>,
                      document.body
                  )
                : null}
        </div>
    );
}
