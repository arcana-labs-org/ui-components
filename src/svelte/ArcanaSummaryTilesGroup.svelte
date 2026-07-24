<script lang="ts">
  /**
   * `<ArcanaSummaryTilesGroup>` — Svelte 5 port. Container grid pros tiles de resumo. Reproduz
   * `<div class="arcana-summary-tiles" style="--arcana-summary-tiles-cols: N">`, idêntico ao SFC.
   *
   * Equivalências: slot default → snippet `children`.
   */
  import type { Snippet } from "svelte";

  let {
    columns = 3,
    format = "columns",
    children,
    class: className = "",
  }: {
    columns?: number | string;
    format?: "columns" | "rows";
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<div
  class={["arcana-summary-tiles", className].filter(Boolean).join(" ")}
  class:arcana-summary-tiles--rows={format === "rows"}
  style={`--arcana-summary-tiles-cols: ${columns};`}
>
  {#if children}{@render children()}{/if}
</div>
