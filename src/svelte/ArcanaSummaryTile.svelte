<script lang="ts">
  /**
   * `<ArcanaSummaryTile>` — Svelte 5 port. Tile compacto de KPI. Reproduz
   * `<div class="arcana-summary-tile arcana-summary-tile--${tone}">`, o `__icon`,
   * `__main`/`__label`/`__sub` e `__value`, idêntico ao SFC.
   *
   * Equivalências: slots `#value`/`#sub` → snippets `valueSlot`/`subSlot`.
   */
  import type { Snippet } from "svelte";

  let {
    label,
    value = null,
    icon = "",
    sub = "",
    tone = "neutral",
    valueSlot,
    subSlot,
    class: className = "",
    style,
  }: {
    label: string;
    value?: string | number | null;
    icon?: string;
    sub?: string;
    tone?: "neutral" | "positive" | "negative" | "indigo";
    valueSlot?: Snippet;
    subSlot?: Snippet;
    class?: string;
    style?: string;
  } = $props();

  const hasSub = $derived(Boolean(subSlot || sub));

  const rootClasses = $derived(
    ["arcana-summary-tile", `arcana-summary-tile--${tone}`, className]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={rootClasses} {style}>
  {#if icon}
    <span class="arcana-summary-tile__icon" aria-hidden="true"><i class={icon}></i></span>
  {/if}

  <div class="arcana-summary-tile__main">
    <span class="arcana-summary-tile__label">{label}</span>
    {#if hasSub}
      <span class="arcana-summary-tile__sub">
        {#if subSlot}{@render subSlot()}{:else}{sub}{/if}
      </span>
    {/if}
  </div>

  <span class="arcana-summary-tile__value">
    {#if valueSlot}{@render valueSlot()}{:else}{value}{/if}
  </span>
</div>
