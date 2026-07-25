import {
    Fragment,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { placePanel } from "../core/popover";

/**
 * `<ArcanaTreeSelect>` — React port do SFC de mesmo nome. Select hierárquico
 * (árvore) arcana-style, agnóstico de domínio: os nós chegam prontos pela prop
 * `options`, o componente nunca busca dados por conta própria.
 *
 * Estrutura: um trigger (botão no modo simples, caixa de tags no `multiple`) que
 * abre um painel em portal no `<body>` com campo de busca + árvore navegável.
 * Clicar num nó seleciona; num nó não-selecionável, apenas expande.
 *
 * Equivalências Vue → React:
 * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
 * - `<Teleport>` + `<Transition>` → `createPortal` (o fade é omitido; o painel
 *   monta/desmonta direto)
 * - `v-html` do highlight → nós React (`<mark>`), sem HTML cru: o texto continua
 *   escapado por construção
 * - listeners globais (mousedown/scroll/resize/keydown) via `useEffect`
 *
 * @example
 * <ArcanaTreeSelect value={costCenterId} options={tree} onValueChange={setId} />
 *
 * @example <caption>Múltiplo, permitindo selecionar nós-pai</caption>
 * <ArcanaTreeSelect value={ids} options={tree} multiple allowParentSelection
 *   onValueChange={(v) => setIds(v as (string | number)[])} />
 */

/** Nó da árvore. `children` vazio/ausente ⇒ folha. */
export interface TreeSelectNode {
    id: string | number;
    name: string;
    children?: TreeSelectNode[];
    disabled?: boolean;
}

export type TreeSelectValue = string | number | null | (string | number)[];

/** Linha achatada da árvore, pronta pro `map` (a recursão vira profundidade + indent). */
interface TreeRow {
    key: string;
    node: TreeSelectNode;
    level: number;
    hasChildren: boolean;
    expanded: boolean;
    selectable: boolean;
    selected: boolean;
    disabled: boolean;
    content: ReactNode;
}

export interface ArcanaTreeSelectProps {
    /** `string | number | null` no modo simples; `(string | number)[]` no `multiple`. */
    value?: TreeSelectValue;
    options?: TreeSelectNode[];
    /** Seleção múltipla: `value` vira array e o trigger mostra tags removíveis. */
    multiple?: boolean;
    /** `false` (default): nós com filhos apenas expandem; só folhas selecionam. */
    allowParentSelection?: boolean;
    disabled?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    /** Mostra o X de limpar no hover do trigger. */
    clearable?: boolean;
    size?: "sm" | "md" | "lg";
    ariaLabel?: string;
    onValueChange?: (value: TreeSelectValue) => void;
    onChange?: (value: TreeSelectValue) => void;
    className?: string;
}

/** Painel estimado antes da primeira medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 340 };

/** Ids podem chegar como string ou number vindos de APIs distintas. */
function sameId(a: string | number, b: string | number): boolean {
    return String(a) === String(b);
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function findNode(
    nodes: TreeSelectNode[],
    id: string | number
): TreeSelectNode | null {
    for (const node of nodes) {
        if (sameId(node.id, id)) return node;
        if (node.children && node.children.length) {
            const found = findNode(node.children, id);
            if (found) return found;
        }
    }
    return null;
}

/** Chaves dos ancestrais de `id` (exclui o próprio nó). `null` se não achar. */
function pathToId(
    nodes: TreeSelectNode[],
    id: string | number,
    acc: string[] = []
): string[] | null {
    for (const node of nodes) {
        if (sameId(node.id, id)) return acc;
        if (node.children && node.children.length) {
            const found = pathToId(node.children, id, [...acc, String(node.id)]);
            if (found) return found;
        }
    }
    return null;
}

/** Filtra a árvore preservando os ancestrais dos matches. */
function filterTree(nodes: TreeSelectNode[], query: string): TreeSelectNode[] {
    const result: TreeSelectNode[] = [];
    for (const node of nodes) {
        const matches = normalize(node.name).includes(query);
        const children =
            node.children && node.children.length
                ? filterTree(node.children, query)
                : [];

        if (matches || children.length) {
            result.push({
                ...node,
                // Nó que casa sozinho mantém a subárvore inteira; caso contrário
                // mostra só o caminho até os descendentes que casaram.
                children: children.length
                    ? children
                    : matches
                      ? node.children
                      : [],
            });
        }
    }
    return result;
}

/**
 * Envolve os trechos que casam com a busca em `<mark>`. Devolve nós React (não
 * HTML), então o texto do rótulo nunca é interpretado como markup.
 */
function highlight(text: string, term: string): ReactNode {
    const needle = term.trim();
    if (!needle) return text;

    const regex = new RegExp(
        needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "gi"
    );
    const parts: ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    let index = 0;

    while ((match = regex.exec(text)) !== null) {
        if (!match[0].length) {
            regex.lastIndex++;
            continue;
        }
        if (match.index > last) parts.push(text.slice(last, match.index));
        parts.push(
            <mark className="arcana-tree-select__mark" key={`m${index++}`}>
                {match[0]}
            </mark>
        );
        last = match.index + match[0].length;
    }

    if (!parts.length) return text;
    if (last < text.length) parts.push(text.slice(last));
    return <Fragment>{parts}</Fragment>;
}

export function ArcanaTreeSelect({
    value = null,
    options = [],
    multiple = false,
    allowParentSelection = false,
    disabled = false,
    placeholder = "Selecione…",
    searchPlaceholder = "Buscar...",
    emptyText = "Nenhum resultado encontrado",
    clearable = true,
    size = "md",
    ariaLabel,
    onValueChange,
    onChange,
    className,
}: ArcanaTreeSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

    const triggerRef = useRef<HTMLElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);
    /** Espelho de `isOpen` pra que `close()` seja estável e idempotente. */
    const isOpenRef = useRef(false);

    const setTriggerRef = useCallback((el: HTMLElement | null) => {
        triggerRef.current = el;
    }, []);

    const isSearching = searchTerm.trim().length > 0;

    const selectedIds = useMemo<(string | number)[]>(() => {
        if (Array.isArray(value)) return value;
        if (value === null || value === undefined || value === "") return [];
        return [value];
    }, [value]);

    const hasValue = selectedIds.length > 0;
    const canClear = clearable && !disabled && hasValue;

    /** Rótulo do id; cai pro próprio id quando o nó ainda não está em `options`. */
    const labelFor = useCallback(
        (id: string | number): string => {
            const node = findNode(options, id);
            return node ? node.name : String(id);
        },
        [options]
    );

    const isSelected = useCallback(
        (id: string | number): boolean =>
            selectedIds.some((selected) => sameId(selected, id)),
        [selectedIds]
    );

    const displayLabel = hasValue
        ? selectedIds.map((id) => labelFor(id)).join(", ")
        : placeholder;

    /** Árvore após a busca: mantém matches + todos os seus ancestrais. */
    const filteredOptions = useMemo<TreeSelectNode[]>(() => {
        if (!isSearching) return options;
        return filterTree(options, normalize(searchTerm));
    }, [isSearching, options, searchTerm]);

    /** Árvore achatada em linhas visíveis (respeita expandido/recolhido). */
    const visibleRows = useMemo<TreeRow[]>(() => {
        const rows: TreeRow[] = [];
        const walk = (nodes: TreeSelectNode[], level: number) => {
            for (const node of nodes) {
                const key = String(node.id);
                const hasChildren = Boolean(node.children && node.children.length);
                const expanded = isSearching || expandedKeys.includes(key);
                const nodeDisabled = Boolean(node.disabled);

                rows.push({
                    key,
                    node,
                    level,
                    hasChildren,
                    expanded,
                    disabled: nodeDisabled,
                    selectable:
                        !nodeDisabled && (!hasChildren || allowParentSelection),
                    selected: isSelected(node.id),
                    content: highlight(node.name, searchTerm),
                });

                if (hasChildren && expanded)
                    walk(node.children as TreeSelectNode[], level + 1);
            }
        };
        walk(filteredOptions, 0);
        return rows;
    }, [
        filteredOptions,
        isSearching,
        expandedKeys,
        allowParentSelection,
        isSelected,
        searchTerm,
    ]);

    /* ─────────────────────────── posicionamento ───────────────────────────── */

    const applyPlacement = useCallback(
        (rect: DOMRect, panel: { width: number; height: number }) => {
            const place = placePanel(
                rect,
                panel,
                { width: window.innerWidth, height: window.innerHeight },
                { matchWidth: true }
            );
            setPanelStyle({
                position: "fixed",
                left: `${place.left}px`,
                top: `${place.top}px`,
                width: `${place.width ?? rect.width}px`,
            });
        },
        []
    );

    const reposition = useCallback(() => {
        const trigger = triggerRef.current;
        const panel = panelRef.current;
        if (!trigger || !panel) return;
        applyPlacement(trigger.getBoundingClientRect(), {
            width: panel.offsetWidth || PANEL_ESTIMATE.width,
            height: panel.offsetHeight || PANEL_ESTIMATE.height,
        });
    }, [applyPlacement]);

    /* ─────────────────────────── expansão ─────────────────────────────────── */

    /** Abre o caminho até cada valor selecionado (mantém o que já estava aberto). */
    const expandToValue = useCallback(() => {
        setExpandedKeys((current) => {
            const keys = new Set(current);
            for (const id of selectedIds) {
                const path = pathToId(options, id);
                if (path) path.forEach((key) => keys.add(key));
            }
            return keys.size === current.length ? current : Array.from(keys);
        });
    }, [options, selectedIds]);

    const toggleExpand = useCallback((key: string) => {
        setExpandedKeys((current) =>
            current.includes(key)
                ? current.filter((item) => item !== key)
                : [...current, key]
        );
    }, []);

    /* ─────────────────────── abertura / fechamento ─────────────────────────── */

    const close = useCallback(() => {
        if (!isOpenRef.current) return;
        isOpenRef.current = false;
        setIsOpen(false);
        setSearchTerm("");
        triggerRef.current?.focus({ preventScroll: true });
    }, []);

    const open = useCallback(() => {
        if (disabled || isOpen) return;
        setSearchTerm("");
        expandToValue();

        // Pré-posiciona com a estimativa pra que o painel já monte na largura
        // final (medir depois de montado devolve a altura correta).
        const trigger = triggerRef.current;
        if (trigger)
            applyPlacement(trigger.getBoundingClientRect(), PANEL_ESTIMATE);

        isOpenRef.current = true;
        setIsOpen(true);
    }, [applyPlacement, disabled, expandToValue, isOpen]);

    const toggle = () => {
        if (disabled) return;
        if (isOpen) close();
        else open();
    };

    // Painel montado / conteúdo mudou de altura → remede a posição.
    useLayoutEffect(() => {
        if (isOpen) reposition();
    }, [isOpen, reposition, visibleRows.length, searchTerm]);

    // Listeners globais + foco na busca enquanto aberto.
    useEffect(() => {
        if (!isOpen) return;

        // `preventScroll` evita que o browser role a página até o painel
        // portalizado (que fica no fim do <body>).
        searchRef.current?.focus({ preventScroll: true });

        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                triggerRef.current?.contains(target) ||
                panelRef.current?.contains(target)
            )
                return;
            close();
        };
        // Scroll DENTRO do painel (lista da árvore) não fecha.
        const onScroll = (event: Event) => {
            if (
                event.target instanceof Node &&
                panelRef.current?.contains(event.target)
            )
                return;
            close();
        };
        const onResize = () => reposition();
        const onDocKeydown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        document.addEventListener("mousedown", onMouseDown, true);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onResize);
        document.addEventListener("keydown", onDocKeydown);

        return () => {
            document.removeEventListener("mousedown", onMouseDown, true);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("keydown", onDocKeydown);
        };
    }, [isOpen, close, reposition]);

    // Valor mudou com o painel aberto → reabre o caminho até ele.
    useEffect(() => {
        if (isOpen) expandToValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isOpen]);

    /* ─────────────────────────── seleção ──────────────────────────────────── */

    const emitValue = (next: TreeSelectValue) => {
        onValueChange?.(next);
        onChange?.(next);
    };

    const onNodeClick = (row: TreeRow) => {
        if (!row.selectable) {
            if (row.hasChildren) toggleExpand(row.key);
            return;
        }

        if (multiple) {
            const current = [...selectedIds];
            const index = current.findIndex((id) => sameId(id, row.node.id));
            if (index >= 0) current.splice(index, 1);
            else current.push(row.node.id);
            emitValue(current);
            return;
        }

        emitValue(row.node.id);
        close();
    };

    const removeValue = (id: string | number) => {
        if (disabled) return;
        emitValue(selectedIds.filter((selected) => !sameId(selected, id)));
    };

    const clear = () => {
        if (disabled) return;
        emitValue(multiple ? [] : null);
    };

    const onTriggerKeydown = (event: ReactKeyboardEvent<HTMLElement>) => {
        if (disabled) return;
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            open();
        }
    };

    const onPanelKeydown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape" || event.key === "Tab") {
            event.preventDefault();
            close();
        }
    };

    /* ─────────────────────────── render ───────────────────────────────────── */

    const rootClasses = [
        "arcana-tree-select",
        `arcana-tree-select--${size}`,
        disabled ? "arcana-tree-select--disabled" : "",
        isOpen ? "arcana-tree-select--open" : "",
        multiple ? "arcana-tree-select--multiple" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const triggerClasses = [
        "arcana-tree-select__trigger",
        multiple ? "arcana-tree-select__trigger--multiple" : "",
        isOpen ? "arcana-tree-select__trigger--open" : "",
        canClear ? "arcana-tree-select__trigger--has-clear" : "",
        disabled ? "arcana-tree-select__trigger--disabled" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const clearButton = canClear ? (
        <span
            className="arcana-tree-select__clear"
            role="button"
            tabIndex={-1}
            aria-label="Limpar"
            onClick={(event) => {
                event.stopPropagation();
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
    ) : null;

    const caret = (
        <svg
            className={["arcana-tree-select__caret", isOpen ? "is-open" : ""]
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
    );

    return (
        <div className={rootClasses}>
            {multiple ? (
                /*
                 * Trigger (modo múltiplo): caixa de tags removíveis. É uma <div>
                 * (e não <button>) porque cada tag traz seu próprio <button> de
                 * remover — botão dentro de botão é HTML inválido.
                 */
                <div
                    ref={setTriggerRef}
                    className={triggerClasses}
                    role="combobox"
                    aria-haspopup="tree"
                    aria-expanded={isOpen}
                    aria-label={ariaLabel}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    onClick={toggle}
                    onKeyDown={onTriggerKeydown}
                >
                    <span className="arcana-tree-select__tags">
                        {selectedIds.map((id) => (
                            <span
                                key={String(id)}
                                className="arcana-tree-select__tag"
                            >
                                <span className="arcana-tree-select__tag-label">
                                    {labelFor(id)}
                                </span>
                                {!disabled ? (
                                    <button
                                        type="button"
                                        className="arcana-tree-select__tag-remove"
                                        aria-label={`Remover ${labelFor(id)}`}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            removeValue(id);
                                        }}
                                    >
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                ) : null}
                            </span>
                        ))}
                        {!selectedIds.length ? (
                            <span className="arcana-tree-select__placeholder">
                                {placeholder}
                            </span>
                        ) : null}
                    </span>
                    {clearButton}
                    {caret}
                </div>
            ) : (
                /* Trigger (modo simples): botão com o rótulo do nó selecionado. */
                <button
                    ref={setTriggerRef}
                    type="button"
                    className={triggerClasses}
                    disabled={disabled}
                    aria-haspopup="tree"
                    aria-expanded={isOpen}
                    aria-label={ariaLabel}
                    onClick={toggle}
                    onKeyDown={onTriggerKeydown}
                >
                    <span
                        className={[
                            "arcana-tree-select__label",
                            !hasValue
                                ? "arcana-tree-select__label--placeholder"
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {displayLabel}
                    </span>
                    {clearButton}
                    {caret}
                </button>
            )}

            {/*
                Painel em portal no <body> (position: fixed via `placePanel`) pra
                escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
            */}
            {isOpen
                ? createPortal(
                      <div
                          ref={panelRef}
                          className="arcana-tree-select__panel"
                          style={panelStyle}
                          aria-label={ariaLabel}
                          tabIndex={-1}
                          onKeyDown={onPanelKeydown}
                      >
                          <div className="arcana-tree-select__search">
                              <svg
                                  className="arcana-tree-select__search-icon"
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
                                  onChange={(event) =>
                                      setSearchTerm(event.target.value)
                                  }
                                  type="search"
                                  name="arcana-tree-select-search"
                                  className="arcana-tree-select__search-input"
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

                          <div className="arcana-tree-select__tree" role="tree">
                              {visibleRows.map((row) => (
                                  <div
                                      key={row.key}
                                      className={[
                                          "arcana-tree-select__node",
                                          row.selected ? "is-selected" : "",
                                          row.selectable ? "is-selectable" : "",
                                          row.hasChildren ? "is-branch" : "",
                                          row.disabled ? "is-disabled" : "",
                                      ]
                                          .filter(Boolean)
                                          .join(" ")}
                                      role="treeitem"
                                      aria-level={row.level + 1}
                                      aria-expanded={
                                          row.hasChildren ? row.expanded : undefined
                                      }
                                      aria-selected={row.selected}
                                      aria-disabled={row.disabled || undefined}
                                      onClick={() => onNodeClick(row)}
                                  >
                                      <span
                                          className="arcana-tree-select__indent"
                                          style={{ width: `${row.level * 14}px` }}
                                          aria-hidden="true"
                                      />

                                      {/* Chevron: só em nós com filhos; clique expande sem selecionar. */}
                                      {row.hasChildren ? (
                                          <span
                                              className={[
                                                  "arcana-tree-select__chevron",
                                                  row.expanded ? "is-expanded" : "",
                                              ]
                                                  .filter(Boolean)
                                                  .join(" ")}
                                              role="button"
                                              tabIndex={-1}
                                              aria-label={
                                                  row.expanded
                                                      ? "Recolher"
                                                      : "Expandir"
                                              }
                                              onClick={(event) => {
                                                  event.stopPropagation();
                                                  toggleExpand(row.key);
                                              }}
                                          >
                                              <svg
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
                                                  <polyline points="9 18 15 12 9 6" />
                                              </svg>
                                          </span>
                                      ) : (
                                          <span
                                              className="arcana-tree-select__chevron arcana-tree-select__chevron--empty"
                                              aria-hidden="true"
                                          />
                                      )}

                                      {/* Pasta (nó com filhos) vs documento (folha) */}
                                      {row.hasChildren ? (
                                          <svg
                                              className="arcana-tree-select__icon arcana-tree-select__icon--folder"
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
                                              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                          </svg>
                                      ) : (
                                          <svg
                                              className="arcana-tree-select__icon arcana-tree-select__icon--leaf"
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
                                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                              <polyline points="14 2 14 8 20 8" />
                                          </svg>
                                      )}

                                      <span className="arcana-tree-select__node-label">
                                          {row.content}
                                      </span>

                                      {row.selected ? (
                                          <svg
                                              className="arcana-tree-select__check"
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
                                  </div>
                              ))}

                              {!visibleRows.length ? (
                                  <div className="arcana-tree-select__empty">
                                      {emptyText}
                                  </div>
                              ) : null}
                          </div>
                      </div>,
                      document.body
                  )
                : null}
        </div>
    );
}
