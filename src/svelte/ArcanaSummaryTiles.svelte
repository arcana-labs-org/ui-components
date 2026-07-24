<script lang="ts">
  /**
   * `<ArcanaSummaryTiles>` — Svelte 5 port. Container grid pros tiles de resumo. Reproduz
   * `<div class="arcana-summary-tiles" style="--arcana-summary-tiles-cols: N">`, idêntico ao SFC.
   *
   * Equivalências: slot default → snippet `children`.
   */
  import type { Snippet } from "svelte";

  let {
    columns = 3,
    children,
    class: className = "",
  }: {
    columns?: number | string;
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<div
  class={["arcana-summary-tiles", className].filter(Boolean).join(" ")}
  style={`--arcana-summary-tiles-cols: ${columns};`}
>
  {#if children}{@render children()}{/if}
</div>
