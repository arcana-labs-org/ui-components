<script lang="ts" module>
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
    | "pills" | "underline" | "boxed" | "sidebar" | "sidebar-soft" | "sidebar-shell" | "segmented";

  let uidCounter = 0;
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { tick } from "svelte";

  /**
   * `<ShadcnTabs>` — Svelte 5 port do SFC Vue. Reproduz o mesmo markup/classes:
   * `shadcn-tabs` (+ `--${variant}`, `--${orientation}`, `--flush`), `shadcn-tabs__list`,
   * `shadcn-tabs__trigger` (+ `is-active`/`is-disabled`/`is-tone-*`), `__trigger-icon`,
   * `__trigger-label`, `__trigger-badge`, `__group-header` e `shadcn-tabs__panel`.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + `onValueChange`; `emit('change')` → `onChange`
   * - slots nomeados (um por `tab.name`) → prop `panels` (mapa name → Snippet) ou `panel`
   *   (Snippet que recebe o tab ativo); `#list-header` → snippet `listHeader`
   *
   * Nota: `tooltipPlacement` do SFC usa `<el-tooltip>` (Element Plus, Vue-only) — este port
   * renderiza os triggers SEM o wrapper de tooltip (o markup do `<button>` é idêntico). A prop
   * é aceita mas ignorada nesta fase.
   */
  type RenderableItem =
    | { type: "header"; label: string; key: string }
    | { type: "tab"; tab: ShadcnTabItem; key: string };

  let {
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
    panel,
    listHeader,
    class: className = "",
  }: {
    value: string | number;
    tabs: ShadcnTabItem[];
    variant?: ShadcnTabsVariant;
    orientation?: "horizontal" | "vertical";
    ariaLabel?: string;
    keepAlive?: boolean;
    flush?: boolean;
    tooltipPlacement?: string;
    onValueChange?: (name: string | number) => void;
    onChange?: (name: string | number) => void;
    /** Mapa `tab.name` → snippet do painel (equivale aos slots nomeados do Vue). */
    panels?: Record<string, Snippet>;
    /** Alternativa a `panels`: snippet único que recebe o tab a renderizar. */
    panel?: Snippet<[ShadcnTabItem]>;
    /** Equivale ao slot `#list-header`. */
    listHeader?: Snippet;
    class?: string;
  } = $props();

  void tooltipPlacement;

  const uid = ++uidCounter;
  const triggerRefs: (HTMLButtonElement | null)[] = [];

  // keepAlive LAZY: nomes de tabs já visitadas ao menos uma vez.
  let activatedTabNames = $state<string[]>(
    value != null && value !== "" ? [String(value)] : []
  );

  $effect(() => {
    const name = value == null ? "" : String(value);
    if (name && !activatedTabNames.includes(name)) {
      activatedTabNames = [...activatedTabNames, name];
    }
  });

  const normalizedTabs = $derived(tabs ?? []);
  const isSidebarLike = $derived(
    variant === "sidebar" || variant === "sidebar-soft" || variant === "sidebar-shell"
  );
  const effectiveOrientation = $derived(isSidebarLike ? "vertical" : orientation);
  const showsGroupHeaders = $derived(variant === "sidebar-soft" || variant === "sidebar-shell");

  const rootClasses = $derived(
    [
      "shadcn-tabs",
      `shadcn-tabs--${variant}`,
      `shadcn-tabs--${effectiveOrientation}`,
      flush ? "shadcn-tabs--flush" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const isActive = (tab: ShadcnTabItem) => tab.name === value;
  const isDisabled = (tab: ShadcnTabItem) => Boolean(tab.disabled);
  const wasActivated = (tab: ShadcnTabItem) =>
    Boolean(tab.eager) || activatedTabNames.includes(String(tab.name));
  const triggerId = (tab: ShadcnTabItem) => `shadcn-tabs-${uid}-trigger-${String(tab.name)}`;
  const panelId = (tab: ShadcnTabItem) => `shadcn-tabs-${uid}-panel-${String(tab.name)}`;
  const triggerIndexOf = (tab: ShadcnTabItem) =>
    normalizedTabs.findIndex((t) => t.name === tab.name);

  const activeTab = $derived(normalizedTabs.find((t) => t.name === value) ?? null);

  const renderableItems = $derived.by<RenderableItem[]>(() => {
    if (!showsGroupHeaders) {
      return normalizedTabs.map((t) => ({ type: "tab" as const, tab: t, key: String(t.name) }));
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
  });

  function select(tab: ShadcnTabItem) {
    if (isDisabled(tab) || isActive(tab)) return;
    onValueChange?.(tab.name);
    onChange?.(tab.name);
  }

  async function focusTrigger(tab: ShadcnTabItem) {
    const tabIdx = triggerIndexOf(tab);
    await tick();
    triggerRefs[tabIdx]?.focus?.();
  }

  function onKeydown(e: KeyboardEvent) {
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
    } else if (e.key === prevKey) {
      e.preventDefault();
      const prev = enabledTabs[(currentIdx - 1 + enabledTabs.length) % enabledTabs.length];
      select(prev);
      focusTrigger(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(enabledTabs[0]);
      focusTrigger(enabledTabs[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      select(enabledTabs[enabledTabs.length - 1]);
      focusTrigger(enabledTabs[enabledTabs.length - 1]);
    }
  }
</script>

{#snippet panelBody(tab: ShadcnTabItem)}
  {#if panels?.[String(tab.name)]}{@render panels[String(tab.name)]()}{:else if panel}{@render panel(tab)}{/if}
{/snippet}

<div class={rootClasses}>
  <div
    class="shadcn-tabs__list"
    role="tablist"
    aria-label={ariaLabel || undefined}
    onkeydown={onKeydown}
  >
    {@render listHeader?.()}

    {#each renderableItems as item (item.key)}
      {#if item.type === "header"}
        <div class="shadcn-tabs__group-header" role="presentation">{item.label}</div>
      {:else}
        <button
          bind:this={triggerRefs[triggerIndexOf(item.tab)]}
          type="button"
          class={[
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
          tabindex={isActive(item.tab) ? 0 : -1}
          disabled={isDisabled(item.tab)}
          onclick={() => select(item.tab)}
        >
          {#if item.tab.icon}
            <i
              class={`shadcn-tabs__trigger-icon ${item.tab.icon}`}
              style={item.tab.iconColor ? `color: ${item.tab.iconColor};` : undefined}
            ></i>
          {/if}
          <span class="shadcn-tabs__trigger-label">{item.tab.label}</span>
          {#if item.tab.badge != null}
            <span class="shadcn-tabs__trigger-badge">{item.tab.badge}</span>
          {/if}
        </button>
      {/if}
    {/each}
  </div>

  {#if keepAlive}
    {#each normalizedTabs as tab (String(tab.name))}
      {#if wasActivated(tab)}
        <div
          class="shadcn-tabs__panel"
          role="tabpanel"
          id={panelId(tab)}
          aria-labelledby={triggerId(tab)}
          tabindex={isActive(tab) ? 0 : -1}
          hidden={!isActive(tab) || undefined}
          style={isActive(tab) ? undefined : "display: none;"}
        >
          {@render panelBody(tab)}
        </div>
      {/if}
    {/each}
  {:else if activeTab}
    <div
      class="shadcn-tabs__panel"
      role="tabpanel"
      id={panelId(activeTab)}
      aria-labelledby={triggerId(activeTab)}
      tabindex={0}
    >
      {@render panelBody(activeTab)}
    </div>
  {/if}
</div>
