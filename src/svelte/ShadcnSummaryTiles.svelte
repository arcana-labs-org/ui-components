<script lang="ts">
  /**
   * `<ShadcnSummaryTiles>` — Svelte 5 port. Container grid pros tiles de resumo. Reproduz
   * `<div class="shadcn-summary-tiles" style="--shadcn-summary-tiles-cols: N">`, idêntico ao SFC.
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
  class={["shadcn-summary-tiles", className].filter(Boolean).join(" ")}
  style={`--shadcn-summary-tiles-cols: ${columns};`}
>
  {#if children}{@render children()}{/if}
</div>
