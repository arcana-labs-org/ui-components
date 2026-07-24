import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

/**
 * `<ShadcnSelect>` — React port. Select custom shadcn-style, totalmente em React/CSS
 * (NÃO usa Element Plus). Reproduz o `<div class="shadcn-select">` (+ `--${size}`,
 * `--disabled`, `--open`), o `__trigger`/`__label`/`__clear`/`__caret`, e o panel
 * teleportado pro `<body>` (`__panel`, `__search`, `__list`, `__item`, `__empty`),
 * idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - `<Teleport>` + `<Transition>` → `createPortal` (a transição de fade é omitida; o
 *   panel monta/desmonta direto — CSS de entrada não é essencial pra funcionalidade)
 * - listeners globais (mousedown/scroll/resize) reproduzidos via `useEffect`
 */
export interface SelectOption {
    label: string;
    value: string | number | boolean | null;
    disabled?: boolean;
    description?: string;
}

export interface ShadcnSelectProps {
    value?: unknown;
    options?: SelectOption[] | string[] | number[];
    placeholder?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    multiple?: boolean;
    clearable?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    onValueChange?: (value: unknown) => void;
    onChange?: (value: unknown) => void;
    className?: string;
}

export function ShadcnSelect({
    value = null,
    options = [],
    placeholder = "Selecione…",
    disabled = false,
    size = "md",
    multiple = false,
    clearable = true,
    searchable = false,
    searchPlaceholder = "Buscar...",
    onValueChange,
    onChange,
    className,
}: ShadcnSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");
    const [panelStyles, setPanelStyles] = useState<CSSProperties>({});

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const normalizedOptions = useMemo<SelectOption[]>(
        () =>
            (options as unknown[]).map((opt) => {
                if (typeof opt === "string" || typeof opt === "number") {
                    return { label: String(opt), value: opt } as SelectOption;
                }
                return opt as SelectOption;
            }),
        [options]
    );

    const isSelected = useCallback(
        (opt: SelectOption): boolean => {
            if (multiple) {
                return Array.isArray(value) && (value as unknown[]).includes(opt.value);
            }
            return opt.value === value;
        },
        [multiple, value]
    );

    const selectedOptions = useMemo<SelectOption[]>(() => {
        if (multiple) {
            const arr = Array.isArray(value) ? (value as unknown[]) : [];
            return normalizedOptions.filter((o) => arr.includes(o.value));
        }
        const single = normalizedOptions.find((o) => o.value === value);
        return single ? [single] : [];
    }, [multiple, value, normalizedOptions]);

    const hasValue = useMemo<boolean>(() => {
        if (multiple) return Array.isArray(value) && (value as unknown[]).length > 0;
        return value !== null && value !== undefined && value !== "";
    }, [multiple, value]);

    const displayLabel = hasValue
        ? selectedOptions.map((o) => o.label).join(", ")
        : placeholder;

    const canClear = clearable && !disabled && hasValue;

    const filteredOptions = useMemo<SelectOption[]>(() => {
        if (!searchable) return normalizedOptions;
        const needle = searchTerm.trim().toLowerCase();
        if (!needle) return normalizedOptions;
        return normalizedOptions.filter((o) =>
            String(o.label).toLowerCase().includes(needle)
        );
    }, [searchable, normalizedOptions, searchTerm]);

    const firstEnabledIndex = useCallback(
        (list: SelectOption[]): number => list.findIndex((o) => !o.disabled),
        []
    );

    const updatePanelPosition = useCallback(() => {
        const trigger = triggerRef.current;
        const panel = panelRef.current;
        if (!trigger || !panel) return;

        const rect = trigger.getBoundingClientRect();
        const panelHeight = panel.offsetHeight || 240;
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const flipUp = spaceBelow < panelHeight + 16 && spaceAbove > spaceBelow;

        setPanelStyles({
            position: "fixed",
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            top: flipUp
                ? `${Math.max(8, rect.top - panelHeight - 4)}px`
                : `${rect.bottom + 4}px`,
            maxHeight: flipUp
                ? `${Math.min(280, spaceAbove - 16)}px`
                : `${Math.min(280, spaceBelow - 16)}px`,
        });
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setSearchTerm("");
        triggerRef.current?.focus({ preventScroll: true });
    }, []);

    const open = useCallback(() => {
        if (disabled) return;
        const trigger = triggerRef.current;
        if (trigger) {
            const rect = trigger.getBoundingClientRect();
            setPanelStyles({
                position: "fixed",
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                top: `${rect.bottom + 4}px`,
                maxHeight: "280px",
            });
        }
        const currentIdx = filteredOptions.findIndex((o) => isSelected(o));
        setHighlightedIndex(
            currentIdx >= 0 ? currentIdx : firstEnabledIndex(filteredOptions)
        );
        setIsOpen(true);
    }, [disabled, filteredOptions, isSelected, firstEnabledIndex]);

    const toggle = () => {
        if (disabled) return;
        isOpen ? close() : open();
    };

    // Após montar o panel: mede posição, anexa listeners globais e foca.
    useEffect(() => {
        if (!isOpen) return;
        updatePanelPosition();

        const onDocumentClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target)) return;
            if (panelRef.current?.contains(target)) return;
            close();
        };
        const reposition = () => updatePanelPosition();

        document.addEventListener("mousedown", onDocumentClick, true);
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);

        const focusTarget = searchable ? searchRef.current : panelRef.current;
        focusTarget?.focus({ preventScroll: true });

        return () => {
            document.removeEventListener("mousedown", onDocumentClick, true);
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // searchTerm muda → reseta highlight e reposiciona (altura muda).
    useEffect(() => {
        if (!isOpen) return;
        setHighlightedIndex(firstEnabledIndex(filteredOptions));
        updatePanelPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const emit = (v: unknown) => {
        onValueChange?.(v);
        onChange?.(v);
    };

    const onItemClick = (opt: SelectOption) => {
        if (opt.disabled) return;
        if (multiple) {
            const current = Array.isArray(value) ? [...(value as unknown[])] : [];
            const idx = current.indexOf(opt.value);
            idx >= 0 ? current.splice(idx, 1) : current.push(opt.value);
            emit(current);
            updatePanelPosition();
            return;
        }
        emit(opt.value);
        close();
    };

    const clear = () => {
        if (disabled) return;
        emit(multiple ? [] : null);
    };

    const moveHighlight = (delta: 1 | -1) => {
        const list = filteredOptions;
        const len = list.length;
        if (!len) return;
        let idx = highlightedIndex;
        for (let i = 0; i < len; i++) {
            idx = (idx + delta + len) % len;
            if (!list[idx].disabled) {
                setHighlightedIndex(idx);
                // scroll highlighted into view
                requestAnimationFrame(() => {
                    const item = panelRef.current?.querySelector<HTMLElement>(
                        ".shadcn-select__item.is-highlighted"
                    );
                    item?.scrollIntoView({ block: "nearest" });
                });
                return;
            }
        }
    };

    const onTriggerKeydown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (
            e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "Enter" ||
            e.key === " "
        ) {
            e.preventDefault();
            open();
        }
    };

    const onPanelKeydown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape" || e.key === "Tab") {
            e.preventDefault();
            close();
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            moveHighlight(1);
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            moveHighlight(-1);
            return;
        }
        if (e.key === "Enter" || (e.key === " " && !searchable)) {
            e.preventDefault();
            const opt = filteredOptions[highlightedIndex];
            if (opt && !opt.disabled) onItemClick(opt);
            return;
        }
        if (e.key === "Home" && !searchable) {
            e.preventDefault();
            setHighlightedIndex(firstEnabledIndex(filteredOptions));
            return;
        }
        if (e.key === "End" && !searchable) {
            e.preventDefault();
            for (let i = filteredOptions.length - 1; i >= 0; i--) {
                if (!filteredOptions[i].disabled) {
                    setHighlightedIndex(i);
                    return;
                }
            }
        }
    };

    const rootClasses = [
        "shadcn-select",
        `shadcn-select--${size}`,
        disabled ? "shadcn-select--disabled" : "",
        isOpen ? "shadcn-select--open" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses}>
            <button
                ref={triggerRef}
                type="button"
                className={[
                    "shadcn-select__trigger",
                    isOpen ? "shadcn-select__trigger--open" : "",
                    canClear ? "shadcn-select__trigger--has-clear" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={toggle}
                onKeyDown={onTriggerKeydown}
            >
                <span
                    className={[
                        "shadcn-select__label",
                        !hasValue ? "shadcn-select__label--placeholder" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {displayLabel}
                </span>

                {canClear ? (
                    <span
                        className="shadcn-select__clear"
                        role="button"
                        tabIndex={-1}
                        aria-label="Limpar"
                        onClick={(e) => {
                            e.stopPropagation();
                            clear();
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </span>
                ) : null}

                <svg
                    className={["shadcn-select__caret", isOpen ? "is-open" : ""]
                        .filter(Boolean)
                        .join(" ")}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen
                ? createPortal(
                      <div
                          ref={panelRef}
                          className="shadcn-select__panel"
                          style={panelStyles}
                          role="listbox"
                          onKeyDown={onPanelKeydown}
                          tabIndex={-1}
                      >
                          {searchable ? (
                              <div className="shadcn-select__search">
                                  <svg
                                      className="shadcn-select__search-icon"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      aria-hidden="true"
                                  >
                                      <circle cx="11" cy="11" r="8" />
                                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  </svg>
                                  <input
                                      ref={searchRef}
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      type="search"
                                      name="shadcn-select-search"
                                      className="shadcn-select__search-input"
                                      placeholder={searchPlaceholder}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="off"
                                      spellCheck={false}
                                      data-lpignore="true"
                                      data-1p-ignore
                                      data-form-type="other"
                                  />
                              </div>
                          ) : null}

                          <ul className="shadcn-select__list">
                              {filteredOptions.map((opt, idx) => (
                                  <li
                                      key={String(opt.value)}
                                      className={[
                                          "shadcn-select__item",
                                          isSelected(opt) ? "is-selected" : "",
                                          highlightedIndex === idx ? "is-highlighted" : "",
                                          opt.disabled ? "is-disabled" : "",
                                      ]
                                          .filter(Boolean)
                                          .join(" ")}
                                      role="option"
                                      aria-selected={isSelected(opt)}
                                      aria-disabled={opt.disabled || false}
                                      onMouseEnter={() =>
                                          !opt.disabled && setHighlightedIndex(idx)
                                      }
                                      onClick={() => onItemClick(opt)}
                                  >
                                      <span className="shadcn-select__item-body">
                                          <span className="shadcn-select__item-label">
                                              {opt.label}
                                          </span>
                                          {opt.description ? (
                                              <span className="shadcn-select__item-desc">
                                                  {opt.description}
                                              </span>
                                          ) : null}
                                      </span>
                                      {isSelected(opt) ? (
                                          <svg
                                              className="shadcn-select__item-check"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="3"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              aria-hidden="true"
                                          >
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      ) : null}
                                  </li>
                              ))}

                              {!filteredOptions.length ? (
                                  <li className="shadcn-select__empty">
                                      {searchTerm.trim()
                                          ? "Nenhum resultado"
                                          : "Nenhuma opção"}
                                  </li>
                              ) : null}
                          </ul>
                      </div>,
                      document.body
                  )
                : null}
        </div>
    );
}
