<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface MultiSelectTab {
    key: string;
    label: string;
    icon?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
</script>

<script lang="ts">
  /**
   * `<ArcanaMultiSelectPopover>` — Svelte 5 port. Popover genérico com tabs configuráveis e
   * multi-seleção via checkbox. Reproduz `<div class="msp">`, o `.msp-trigger` default
   * (customizável via snippet `renderTrigger`), o painel teleportado (`.msp-panel`,
   * `.msp-segmented`/`.msp-seg`, `.msp-search-wrap`/`.msp-search`, `.msp-list`/`.msp-item`,
   * `.msp-footer`), idêntico ao SFC/React port.
   *
   * Equivalências: `modelValue` → `value` + `onValueChange`;
   * `emit('change'|'open'|'close')` → `onChange`/`onOpen`/`onClose`;
   * slot `#trigger` → snippet `renderTrigger(ctx)`; slot `#item` → snippet `renderItem({item,tab,selected})`;
   * `<Teleport>`/`<transition>` → action `use:portal` (fade omitido).
   */
  import { untrack } from "svelte";
  import { portal } from "./portal";

  let {
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
    class: className = "",
  }: {
    value?: Record<string, number[]>;
    tabs: MultiSelectTab[];
    emptyLabel?: string;
    triggerIcon?: string;
    defaultTab?: string;
    onValueChange?: (value: Record<string, number[]>) => void;
    onChange?: (value: Record<string, number[]>) => void;
    onOpen?: () => void;
    onClose?: () => void;
    renderTrigger?: Snippet<[MultiSelectTriggerContext]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderItem?: Snippet<[{ item: any; tab?: MultiSelectTab; selected: boolean }]>;
    class?: string;
  } = $props();

  let isOpen = $state(false);
  let activeKey = $state("");
  let search = $state("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cache = $state<Record<string, any[]>>({});
  let panelStyle = $state("");
  let loadingKey = $state<string | null>(null);

  let rootEl: HTMLDivElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);
  let searchEl: HTMLInputElement | null = $state(null);
  const loadingRef: Record<string, boolean> = {};
  const loadedRef: Record<string, boolean> = {};

  // Inicializa/normaliza a aba ativa quando `tabs` muda (watch immediate do SFC).
  $effect(() => {
    void tabs;
    void defaultTab;
    untrack(() => {
      if (!activeKey || !tabs.find((t) => t.key === activeKey)) {
        activeKey = defaultTab || tabs[0]?.key || "";
      }
    });
  });

  const activeTab = $derived(tabs.find((t) => t.key === activeKey));
  const items = $derived(cache[activeKey] ?? []);
  const loading = $derived(Boolean(loadingKey === activeKey));

  const filteredItems = $derived.by(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    const fields = activeTab?.searchFields ?? ["name"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.filter((it: any) => {
      for (const f of fields) {
        const v = it?.[f];
        if (typeof v === "string" && v.toLowerCase().includes(term)) return true;
      }
      return false;
    });
  });

  const selectedIdsForActive = $derived((value?.[activeKey] ?? []) as number[]);

  const selectedCount = $derived(
    tabs.reduce((acc, t) => acc + (value?.[t.key] ?? []).length, 0)
  );
  const isEmpty = $derived(selectedCount === 0);

  const summary = $derived.by(() => {
    if (selectedCount === 0) return emptyLabel;
    const names: string[] = [];
    for (const tab of tabs) {
      const ids = (value?.[tab.key] ?? []) as number[];
      if (!ids.length) continue;
      const list = cache[tab.key] ?? [];
      for (const id of ids) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = list.find((x: any) => x.id === id);
        if (found?.name) names.push(found.name);
      }
    }
    if (names.length === 0) return `${selectedCount} selecionado(s)`;
    const visible = names.slice(0, 2);
    const rest = selectedCount - visible.length;
    return rest > 0 ? `${visible.join(", ")}, +${rest}` : visible.join(", ");
  });

  const footerSummary = $derived.by(() => {
    const parts: string[] = [];
    for (const tab of tabs) {
      const count = (value?.[tab.key] ?? []).length;
      if (!count) continue;
      const label = tab.countLabel ?? tab.label.toLowerCase();
      parts.push(`${count} ${label}`);
    }
    return parts.join(", ") + " selecionado(s)";
  });

  function positionPanel() {
    const root = rootEl;
    const trigger = root?.firstElementChild as HTMLElement | undefined;
    const panel = panelEl;
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

    panelStyle = `top:${top}px;left:${left}px;width:${width}px;`;
  }

  async function ensureLoaded(key: string) {
    if (loadedRef[key] || loadingRef[key]) return;
    const tab = tabs.find((t) => t.key === key);
    if (!tab) return;
    loadingRef[key] = true;
    loadingKey = key;
    try {
      const result = await tab.fetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = Array.isArray(result) ? result : (result as any)?.data ?? [];
      cache = { ...cache, [key]: data };
      loadedRef[key] = true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`[multi-select-popover] erro ao carregar tab "${key}"`, e);
    } finally {
      loadingRef[key] = false;
      if (loadingKey === key) loadingKey = null;
    }
  }

  function close() {
    isOpen = false;
    search = "";
    onClose?.();
  }

  async function open() {
    if (!activeKey) return;
    isOpen = true;
    onOpen?.();
    await Promise.all(tabs.map((t) => ensureLoaded(t.key)));
  }

  function toggle() {
    if (isOpen) close();
    else void open();
  }

  // Listeners globais + posicionamento + foco quando aberto.
  $effect(() => {
    if (!isOpen) return;
    positionPanel();

    const handleOutsideClick = (e: MouseEvent) => {
      const root = rootEl;
      const panel = panelEl;
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

    requestAnimationFrame(() => searchEl?.focus());

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel, true);
    };
  });

  async function setActive(key: string) {
    if (activeKey === key) return;
    activeKey = key;
    search = "";
    await ensureLoaded(key);
  }

  const isSelected = (id: number) => selectedIdsForActive.includes(id);

  function emitValue(next: Record<string, number[]>) {
    onValueChange?.(next);
    onChange?.(next);
  }

  function toggleItem(id: number) {
    const next: Record<string, number[]> = { ...(value || {}) };
    const arr = [...(next[activeKey] ?? [])];
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    next[activeKey] = arr;
    emitValue(next);
  }

  function clearActive() {
    const next: Record<string, number[]> = { ...(value || {}) };
    next[activeKey] = [];
    emitValue(next);
  }

  const triggerCtx = $derived<MultiSelectTriggerContext>({
    open: () => void open(),
    toggle,
    isOpen,
    summary,
    isEmpty,
    selectedCount,
  });
</script>

<div class={["msp", className].filter(Boolean).join(" ")} bind:this={rootEl}>
  {#if renderTrigger}
    {@render renderTrigger(triggerCtx)}
  {:else}
    <button
      type="button"
      class={[
        "msp-trigger",
        isOpen ? "msp-trigger--open" : "",
        isEmpty ? "msp-trigger--empty" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onclick={toggle}
    >
      <i class={`${triggerIcon} msp-trigger__icon`}></i>
      <span class="msp-trigger__summary">{summary}</span>
      <i class="fa-solid fa-chevron-down msp-trigger__chevron"></i>
    </button>
  {/if}

  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      class="msp-panel"
      style={panelStyle}
      onclick={(e) => e.stopPropagation()}
    >
      {#if tabs.length > 1}
        <div class="msp-segmented">
          {#each tabs as t (t.key)}
            <button
              type="button"
              class={["msp-seg", activeKey === t.key ? "msp-seg--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onclick={() => void setActive(t.key)}
            >
              {#if t.icon}<i class={t.icon}></i>{/if}
              {t.label}
            </button>
          {/each}
        </div>
      {/if}

      <div class="msp-search-wrap">
        <i class="fa-solid fa-magnifying-glass msp-search-icon"></i>
        <input
          bind:this={searchEl}
          bind:value={search}
          type="text"
          class="msp-search"
          placeholder={activeTab?.placeholder ||
            `Buscar ${activeTab?.label?.toLowerCase() ?? ""}…`}
        />
      </div>

      {#if loading}
        <div class="msp-empty">Carregando…</div>
      {:else if filteredItems.length === 0}
        <div class="msp-empty">Nenhum item encontrado</div>
      {:else}
        <div class="msp-list">
          {#each filteredItems as item (`item-${activeKey}-${item.id}`)}
            <div
              class={["msp-item", isSelected(item.id) ? "msp-item--selected" : ""]
                .filter(Boolean)
                .join(" ")}
              onclick={() => toggleItem(item.id)}
            >
              <span class="msp-check">
                {#if isSelected(item.id)}<i class="fa-solid fa-check"></i>{/if}
              </span>
              {#if renderItem}
                {@render renderItem({ item, tab: activeTab, selected: isSelected(item.id) })}
              {:else}
                <span class="msp-item__name">{item.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}

      {#if selectedCount > 0}
        <div class="msp-footer">
          <span class="msp-footer__count">{footerSummary}</span>
          <button type="button" class="msp-footer__clear" onclick={clearActive}>Limpar</button>
        </div>
      {/if}
    </div>
  {/if}
</div>
