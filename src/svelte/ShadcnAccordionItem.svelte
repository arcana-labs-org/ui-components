<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import { ACCORDION_CONTEXT, type AccordionApi } from "./ShadcnAccordion.svelte";

  /**
   * `<ShadcnAccordionItem>` — Svelte 5 port. Reproduz o item (`shadcn-accordion-item` +
   * `open`/`disabled`, `shadcn-accordion-trigger`, `shadcn-accordion-title`,
   * `shadcn-accordion-chevron`, `shadcn-accordion-content`), idêntico ao SFC.
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
    throw new Error("ShadcnAccordionItem must be used within a ShadcnAccordion");
  }

  const open = $derived(api.isOpen(name));

  const rootClasses = $derived(
    ["shadcn-accordion-item", open ? "open" : "", disabled ? "disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );

  function onToggle() {
    if (disabled) return;
    api.toggle(name);
  }
</script>

<div class={rootClasses}>
  <button type="button" class="shadcn-accordion-trigger" {disabled} onclick={onToggle}>
    <span class="shadcn-accordion-title">
      {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
    </span>
    <i class="fa-solid fa-chevron-down shadcn-accordion-chevron"></i>
  </button>
  <!-- Vue usa `v-show` — o content fica montado e alterna via `display` (preserva estado). -->
  <div class="shadcn-accordion-content" style={open ? undefined : "display: none;"}>
    {@render children?.()}
  </div>
</div>
