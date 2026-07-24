<script lang="ts">
  /**
   * `<ShadcnSettingsListItem>` — Svelte 5 port do SFC Vue. Item individual de uma
   * `<ShadcnSettingsList>`: `[label + caption]  ←→  [action slot]`.
   *
   * Equivalências Vue → Svelte 5:
   * - slots `#label` / `#caption` → snippets `label` / `caption` (fallback pras props string)
   * - slot default (controle à direita) → snippet `children`
   */
  import type { Snippet } from "svelte";

  let {
    label = "",
    caption = "",
    disabled = false,
    nested = false,
    children,
  }: {
    label?: string | Snippet;
    caption?: string | Snippet;
    disabled?: boolean;
    nested?: boolean;
    children?: Snippet;
  } = $props();

  const hasCaption = $derived(Boolean(caption));

  const classes = $derived(
    [
      "shadcn-settings-list__item",
      disabled ? "shadcn-settings-list__item--disabled" : "",
      nested ? "shadcn-settings-list__item--nested" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={classes}>
  <div class="shadcn-settings-list__text">
    <div class="shadcn-settings-list__label">
      {#if typeof label === "function"}{@render label()}{:else}{label}{/if}
    </div>
    {#if hasCaption}
      <div class="shadcn-settings-list__caption">
        {#if typeof caption === "function"}{@render caption()}{:else}{caption}{/if}
      </div>
    {/if}
  </div>
  <div class="shadcn-settings-list__action">{@render children?.()}</div>
</div>
