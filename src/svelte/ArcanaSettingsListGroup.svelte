<script lang="ts" module>
  export type SettingsGroupIconColor =
    | "blue"
    | "emerald"
    | "amber"
    | "rose"
    | "violet"
    | "indigo"
    | "teal"
    | "slate";
</script>

<script lang="ts">
  /**
   * `<ArcanaSettingsListGroup>` — Svelte 5 port do SFC Vue. Section interna do
   * `<ArcanaSettingsList>` com header (ícone boxed opcional + title + meta opcional).
   *
   * Equivalências Vue → Svelte 5:
   * - `data.isCollapsed` → `$state`; `<component :is="collapsible ? 'button' : 'header'">`
   *   → branch `{#if collapsible}` (button/header) igual ao port React
   * - slots `#title` / `#meta` → snippets `title` / `meta` (fallback pras props string)
   * - slot default → snippet `children`
   */
  import type { Snippet } from "svelte";

  let {
    title = "",
    sectionNum = "",
    meta,
    icon = "",
    iconColor = "slate",
    collapsible = false,
    defaultCollapsed = false,
    compact = false,
    children,
  }: {
    title?: string | Snippet;
    sectionNum?: string;
    meta?: string | Snippet;
    icon?: string;
    iconColor?: SettingsGroupIconColor;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    compact?: boolean;
    children?: Snippet;
  } = $props();

  let isCollapsed = $state(collapsible && defaultCollapsed);

  function toggle() {
    isCollapsed = !isCollapsed;
  }

  const hasTitle = $derived(Boolean(title));
  const hasMeta = $derived(Boolean(meta));
  const showHead = $derived(hasTitle || hasMeta || Boolean(icon) || Boolean(sectionNum));

  const sectionClasses = $derived(
    [
      "arcana-settings-list__group",
      compact ? "arcana-settings-list__group--compact" : "",
      collapsible ? "arcana-settings-list__group--collapsible" : "",
      collapsible && isCollapsed ? "arcana-settings-list__group--collapsed" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

{#snippet headInner()}
  <div class="arcana-settings-list__group-head-left">
    {#if icon}
      <span
        class={`arcana-settings-list__group-icon arcana-settings-list__group-icon--${iconColor}`}
        aria-hidden="true"
      >
        <i class={icon}></i>
      </span>
    {/if}
    <div>
      {#if sectionNum}
        <div class="arcana-settings-list__group-num">{sectionNum}</div>
      {/if}
      <div class="arcana-settings-list__group-title">
        {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
      </div>
    </div>
  </div>

  <div class="arcana-settings-list__group-head-right">
    {#if hasMeta}
      <div class="arcana-settings-list__group-meta">
        {#if typeof meta === "function"}{@render meta()}{:else}{meta}{/if}
      </div>
    {/if}
    {#if collapsible}
      <svg
        class="arcana-settings-list__group-chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    {/if}
  </div>
{/snippet}

<section class={sectionClasses}>
  {#if showHead}
    {#if collapsible}
      <button
        type="button"
        class="arcana-settings-list__group-head"
        aria-expanded={!isCollapsed}
        onclick={toggle}
      >
        {@render headInner()}
      </button>
    {:else}
      <header class="arcana-settings-list__group-head">
        {@render headInner()}
      </header>
    {/if}
  {/if}

  {#if !collapsible || !isCollapsed}
    <div>{@render children?.()}</div>
  {/if}
</section>
