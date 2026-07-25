<script lang="ts" module>
  /** Nó da árvore. `children` vazio/ausente ⇒ folha. */
  export interface TreeSelectNode {
    id: string | number;
    name: string;
    children?: TreeSelectNode[];
    disabled?: boolean;
  }

  export type TreeSelectValue = string | number | null | (string | number)[];

  /** Linha achatada da árvore, pronta pro `{#each}` (a recursão vira profundidade + indent). */
  interface TreeRow {
    key: string;
    node: TreeSelectNode;
    level: number;
    hasChildren: boolean;
    expanded: boolean;
    selectable: boolean;
    selected: boolean;
    disabled: boolean;
    html: string;
  }

  const HTML_ESCAPES: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  /** Painel estimado antes da primeira medição (evita flip errado no 1º frame). */
  const PANEL_ESTIMATE = { width: 280, height: 340 };
</script>

<script lang="ts">
  /**
   * `<ArcanaTreeSelect>` — Svelte 5 (runes) port do SFC Vue: select hierárquico
   * (árvore) arcana-style, sem Element Plus e agnóstico de domínio — os nós chegam
   * prontos pela prop `options`, o componente nunca busca dados por conta própria.
   *
   * Estrutura: um trigger (input-like no modo simples, caixa de tags no `multiple`)
   * que abre um painel portado pro `<body>` (action `use:portal`) com um campo de
   * busca + a árvore navegável. Clicar num nó seleciona; num nó não-selecionável,
   * apenas expande. MESMAS classes `.arcana-tree-select__*` dos ports Vue/React.
   *
   * Convenção de reatividade (parity com os demais ports Svelte, NÃO `$bindable`):
   * `modelValue` (v-model) → prop `value` + callback `onValueChange`; o `change` do
   * Vue vira o callback separado `onChange`. Ambos recebem o valor completo (id no
   * modo simples / array de ids no `multiple`; `null` / `[]` ao limpar).
   *
   * Busca: filtra a árvore preservando os ancestrais dos matches, auto-expande tudo
   * enquanto há termo, destaca o trecho encontrado com `<mark>` (texto ESCAPADO
   * antes de virar HTML) e mostra `emptyText` quando nada casa. A comparação ignora
   * acentos e caixa.
   *
   * Posicionamento: `placePanel` (core/popover) com `matchWidth`, auto-flip pra cima
   * quando não cabe abaixo. Fecha em clique-fora, `Escape` e scroll externo;
   * reposiciona no resize.
   */
  import { untrack } from "svelte";
  import { placePanel } from "../core/popover";
  import { portal } from "./portal";

  let {
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
    panelClass = undefined,
    onValueChange,
    onChange,
  }: {
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
    /**
     * Classe extra aplicada ao painel. Como o painel é portado pro `<body>`, um
     * seletor no wrapper do campo não o alcança — use isto pra escopar tema (os
     * custom properties `--arcana-tree-select-*`) a uma instância específica.
     */
    panelClass?: string;
    onValueChange?: (value: TreeSelectValue) => void;
    onChange?: (value: TreeSelectValue) => void;
  } = $props();

  let isOpen = $state(false);
  let searchTerm = $state("");
  let expandedKeys = $state<string[]>([]);
  let panelStyle = $state("");

  let triggerEl: HTMLElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);
  let searchEl: HTMLInputElement | null = $state(null);

  /* ─────────────────────────── helpers de árvore ─────────────────────────── */

  /** Ids podem chegar como string ou number vindos de APIs distintas. */
  const sameId = (a: string | number, b: string | number): boolean => String(a) === String(b);

  function findNode(nodes: TreeSelectNode[], id: string | number): TreeSelectNode | null {
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

  /** Rótulo do id; cai pro próprio id quando o nó ainda não está em `options`. */
  function labelFor(id: string | number): string {
    const node = findNode(options, id);
    return node ? node.name : String(id);
  }

  const normalize = (text: string): string =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function filterTree(nodes: TreeSelectNode[], query: string): TreeSelectNode[] {
    const result: TreeSelectNode[] = [];
    for (const node of nodes) {
      const matches = normalize(node.name).includes(query);
      const children =
        node.children && node.children.length ? filterTree(node.children, query) : [];

      if (matches || children.length) {
        result.push({
          ...node,
          // Nó que casa sozinho mantém a subárvore inteira; caso contrário
          // mostra só o caminho até os descendentes que casaram.
          children: children.length ? children : matches ? node.children : [],
        });
      }
    }
    return result;
  }

  const escapeHtml = (text: string): string =>
    text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

  /** Escapa o rótulo e envolve os trechos que casam com a busca em `<mark>`. */
  function highlight(text: string): string {
    const term = searchTerm.trim();
    if (!term) return escapeHtml(text);

    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let out = "";
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (!match[0].length) {
        regex.lastIndex++;
        continue;
      }
      out += escapeHtml(text.slice(last, match.index));
      out += `<mark class="arcana-tree-select__mark">${escapeHtml(match[0])}</mark>`;
      last = match.index + match[0].length;
    }
    return out + escapeHtml(text.slice(last));
  }

  /* ─────────────────────────── estado derivado ───────────────────────────── */

  const isSearching = $derived(searchTerm.trim().length > 0);

  const selectedIds = $derived.by<(string | number)[]>(() => {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined || value === "") return [];
    return [value];
  });

  const hasValue = $derived(selectedIds.length > 0);
  const canClear = $derived(clearable && !disabled && hasValue);
  const displayLabel = $derived(
    hasValue ? selectedIds.map((id) => labelFor(id)).join(", ") : placeholder
  );

  const isSelected = (id: string | number): boolean =>
    selectedIds.some((selected) => sameId(selected, id));

  /** Árvore após a busca: mantém matches + todos os seus ancestrais. */
  const filteredOptions = $derived.by<TreeSelectNode[]>(() =>
    isSearching ? filterTree(options, normalize(searchTerm)) : options
  );

  /** Árvore achatada em linhas visíveis (respeita expandido/recolhido). */
  const visibleRows = $derived.by<TreeRow[]>(() => {
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
          selectable: !nodeDisabled && (!hasChildren || allowParentSelection),
          selected: isSelected(node.id),
          html: highlight(node.name),
        });

        if (hasChildren && expanded) walk(node.children as TreeSelectNode[], level + 1);
      }
    };
    walk(filteredOptions, 0);
    return rows;
  });

  const rootClasses = $derived(
    [
      "arcana-tree-select",
      `arcana-tree-select--${size}`,
      disabled ? "arcana-tree-select--disabled" : "",
      isOpen ? "arcana-tree-select--open" : "",
      multiple ? "arcana-tree-select--multiple" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );

  const triggerClasses = $derived(
    [
      "arcana-tree-select__trigger",
      multiple ? "arcana-tree-select__trigger--multiple" : "",
      isOpen ? "arcana-tree-select__trigger--open" : "",
      canClear ? "arcana-tree-select__trigger--has-clear" : "",
      disabled ? "arcana-tree-select__trigger--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );

  /* ─────────────────────────── posicionamento ────────────────────────────── */

  function applyPlacement(rect: DOMRect, panel: { width: number; height: number }) {
    const place = placePanel(
      rect,
      panel,
      { width: window.innerWidth, height: window.innerHeight },
      { matchWidth: true }
    );
    panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px; width: ${place.width ?? rect.width}px`;
  }

  function reposition() {
    if (!triggerEl || !panelEl) return;
    applyPlacement(triggerEl.getBoundingClientRect(), {
      width: panelEl.offsetWidth || PANEL_ESTIMATE.width,
      height: panelEl.offsetHeight || PANEL_ESTIMATE.height,
    });
  }

  /** A altura do painel muda depois do próximo paint (filtro/expansão). */
  function scheduleReposition() {
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => reposition());
    else reposition();
  }

  /* ─────────────────────────── expansão ──────────────────────────────────── */

  function toggleExpand(key: string) {
    const index = expandedKeys.indexOf(key);
    if (index >= 0) expandedKeys = expandedKeys.filter((_, i) => i !== index);
    else expandedKeys = [...expandedKeys, key];
    scheduleReposition();
  }

  /** Abre o caminho até cada valor selecionado (mantém o que já estava aberto). */
  function expandToValue() {
    const keys = new Set(expandedKeys);
    for (const id of selectedIds) {
      const path = pathToId(options, id);
      if (path) path.forEach((key) => keys.add(key));
    }
    expandedKeys = Array.from(keys);
  }

  /* ─────────────────────── abertura / fechamento ─────────────────────────── */

  function open() {
    if (disabled || isOpen) return;

    searchTerm = "";
    expandToValue();

    // Pré-posiciona com a estimativa pra que o painel já monte na largura final
    // (medir depois de montado devolve a altura correta).
    if (triggerEl) applyPlacement(triggerEl.getBoundingClientRect(), PANEL_ESTIMATE);

    isOpen = true;
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    searchTerm = "";
    triggerEl?.focus({ preventScroll: true });
  }

  function toggle() {
    if (disabled) return;
    if (isOpen) close();
    else open();
  }

  // Painel montado: mede a posição real, anexa os listeners globais e foca a busca.
  $effect(() => {
    if (!isOpen) return;
    reposition();

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as globalThis.Node;
      if (triggerEl?.contains(target) || panelEl?.contains(target)) return;
      close();
    };
    // Scroll DENTRO do painel (lista da árvore) não fecha.
    const onScroll = (event: Event) => {
      if (event.target instanceof globalThis.Node && panelEl?.contains(event.target)) return;
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

    // `preventScroll` evita que o browser role a página até o painel portado
    // (que fica no fim do <body>).
    searchEl?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onDocKeydown);
    };
  });

  // value muda com o painel aberto → reabre o caminho até o(s) novo(s) valor(es).
  $effect(() => {
    value;
    untrack(() => {
      if (isOpen) expandToValue();
    });
  });

  // Altura do painel muda com o filtro → recalcula a posição.
  $effect(() => {
    searchTerm;
    untrack(() => {
      if (isOpen) scheduleReposition();
    });
  });

  /* ─────────────────────────── seleção ───────────────────────────────────── */

  function emitValue(next: TreeSelectValue) {
    onValueChange?.(next);
    onChange?.(next);
  }

  function onNodeClick(row: TreeRow) {
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
      scheduleReposition();
      return;
    }

    emitValue(row.node.id);
    close();
  }

  function removeValue(id: string | number) {
    if (disabled) return;
    emitValue(selectedIds.filter((selected) => !sameId(selected, id)));
  }

  function clear() {
    if (disabled) return;
    emitValue(multiple ? [] : null);
  }

  function onTriggerKeydown(event: KeyboardEvent) {
    if (disabled) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      open();
    }
  }

  function onPanelKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      close();
    }
  }
</script>

<div class={rootClasses}>
  <!--
    Trigger (modo múltiplo): caixa de tags removíveis. É uma <div> (e não
    <button>) porque cada tag traz seu próprio <button> de remover — botão
    dentro de botão é HTML inválido.
  -->
  {#if multiple}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={triggerEl}
      class={triggerClasses}
      role="combobox"
      aria-haspopup="tree"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabindex={disabled ? -1 : 0}
      onclick={toggle}
      onkeydown={onTriggerKeydown}
    >
      <span class="arcana-tree-select__tags">
        {#each selectedIds as id (String(id))}
          <span class="arcana-tree-select__tag">
            <span class="arcana-tree-select__tag-label">{labelFor(id)}</span>
            {#if !disabled}
              <button
                type="button"
                class="arcana-tree-select__tag-remove"
                aria-label={`Remover ${labelFor(id)}`}
                onclick={(event) => {
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
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            {/if}
          </span>
        {/each}
        {#if !selectedIds.length}
          <span class="arcana-tree-select__placeholder">{placeholder}</span>
        {/if}
      </span>

      {#if canClear}
        <span
          class="arcana-tree-select__clear"
          role="button"
          tabindex="-1"
          aria-label="Limpar"
          onclick={(event) => {
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
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      {/if}

      <svg
        class={["arcana-tree-select__caret", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  {:else}
    <!-- Trigger (modo simples): botão com o rótulo do nó selecionado. -->
    <button
      bind:this={triggerEl}
      type="button"
      class={triggerClasses}
      {disabled}
      aria-haspopup="tree"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      onclick={toggle}
      onkeydown={onTriggerKeydown}
    >
      <span
        class={[
          "arcana-tree-select__label",
          !hasValue ? "arcana-tree-select__label--placeholder" : "",
        ]
          .filter(Boolean)
          .join(" ")}>{displayLabel}</span
      >

      {#if canClear}
        <span
          class="arcana-tree-select__clear"
          role="button"
          tabindex="-1"
          aria-label="Limpar"
          onclick={(event) => {
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
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      {/if}

      <svg
        class={["arcana-tree-select__caret", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  {/if}

  <!--
    Painel portado pro <body> (position: fixed via `placePanel`) pra escapar de
    qualquer ancestral com overflow:hidden / z-index restritivo.
  -->
  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      class={["arcana-tree-select__panel", panelClass].filter(Boolean).join(" ")}
      style={panelStyle}
      aria-label={ariaLabel}
      tabindex="-1"
      onkeydown={onPanelKeydown}
    >
      <div class="arcana-tree-select__search">
        <svg
          class="arcana-tree-select__search-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          bind:this={searchEl}
          bind:value={searchTerm}
          type="search"
          name="arcana-tree-select-search"
          class="arcana-tree-select__search-input"
          placeholder={searchPlaceholder}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          data-lpignore="true"
          data-1p-ignore
          data-form-type="other"
        />
      </div>

      <div class="arcana-tree-select__tree" role="tree">
        {#each visibleRows as row}
          <div
            class={[
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
            aria-expanded={row.hasChildren ? row.expanded : undefined}
            aria-selected={row.selected}
            aria-disabled={row.disabled || undefined}
            onclick={() => onNodeClick(row)}
          >
            <span
              class="arcana-tree-select__indent"
              style={`width: ${row.level * 14}px`}
              aria-hidden="true"
            ></span>

            <!-- Chevron: só em nós com filhos; clique expande sem selecionar. -->
            {#if row.hasChildren}
              <span
                class={["arcana-tree-select__chevron", row.expanded ? "is-expanded" : ""]
                  .filter(Boolean)
                  .join(" ")}
                role="button"
                tabindex="-1"
                aria-label={row.expanded ? "Recolher" : "Expandir"}
                onclick={(event) => {
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
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            {:else}
              <span
                class="arcana-tree-select__chevron arcana-tree-select__chevron--empty"
                aria-hidden="true"
              ></span>
            {/if}

            <!-- Pasta (nó com filhos) vs documento (folha) -->
            {#if row.hasChildren}
              <svg
                class="arcana-tree-select__icon arcana-tree-select__icon--folder"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            {:else}
              <svg
                class="arcana-tree-select__icon arcana-tree-select__icon--leaf"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            {/if}

            <!-- conteúdo já escapado em `highlight()` -->
            <span class="arcana-tree-select__node-label">{@html row.html}</span>

            {#if row.selected}
              <svg
                class="arcana-tree-select__check"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            {/if}
          </div>
        {/each}

        {#if !visibleRows.length}
          <div class="arcana-tree-select__empty">{emptyText}</div>
        {/if}
      </div>
    </div>
  {/if}
</div>
