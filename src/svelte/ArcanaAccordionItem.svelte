<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import { ACCORDION_CONTEXT, type AccordionApi } from "./ArcanaAccordion.svelte";

  /**
   * `<ArcanaAccordionItem>` — Svelte 5 port. Reproduz o item (`arcana-accordion-item` +
   * `open`/`disabled`, `arcana-accordion-trigger`, `arcana-accordion-title`,
   * `arcana-accordion-chevron`, `arcana-accordion-content`), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `inject('accordionApi')` → `getContext(ACCORDION_CONTEXT)`
   * - slots default/`#title` → snippet `children` / prop `title` (`string | Snippet`)
   */
  let {
    name,
    title = "",
    disabled = false,
    class: className = "",
    children,
  }: {
    name: string;
    title?: string | Snippet;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();

  const api = getContext<AccordionApi>(ACCORDION_CONTEXT);
  if (!api) {
    throw new Error("ArcanaAccordionItem must be used within a ArcanaAccordion");
  }

  const open = $derived(api.isOpen(name));

  const rootClasses = $derived(
    ["arcana-accordion-item", open ? "open" : "", disabled ? "disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );

  function onToggle() {
    if (disabled) return;
    api.toggle(name);
  }
</script>

<div class={rootClasses}>
  <button type="button" class="arcana-accordion-trigger" {disabled} onclick={onToggle}>
    <span class="arcana-accordion-title">
      {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
    </span>
    <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
  </button>
  <!-- Vue usa `v-show` — o content fica montado e alterna via `display` (preserva estado). -->
  <div class="arcana-accordion-content" style={open ? undefined : "display: none;"}>
    {@render children?.()}
  </div>
</div>
