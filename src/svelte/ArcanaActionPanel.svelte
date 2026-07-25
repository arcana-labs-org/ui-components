<script lang="ts">
  /**
   * `<ArcanaActionPanel>` — Svelte 5 port do SFC Vue. Empty state / CTA panel pra
   * primeiras configurações. Markup/classes `arcana-action-panel*` idênticos ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - slot default → snippet `children` (fallback: `description`)
   * - slot `#action` → snippet `action` (substitui a CTA padrão)
   * - slot `#sub-hint` → snippet `subHintSlot` (substitui o sub-hint padrão)
   * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
   */
  import type { Snippet } from "svelte";
  import ArcanaButton from "./ArcanaButton.svelte";

  let {
    icon,
    title,
    description = "",
    actionLabel = "",
    actionIcon = "fa-solid fa-plus",
    actionLoading = false,
    secondaryActionLabel = "",
    secondaryActionIcon = "",
    subHint = "",
    subHintIcon = "",
    children,
    action,
    subHintSlot,
    onAction,
    onSecondaryAction,
  }: {
    icon: string;
    title: string;
    description?: string;
    actionLabel?: string;
    actionIcon?: string;
    actionLoading?: boolean;
    secondaryActionLabel?: string;
    secondaryActionIcon?: string;
    subHint?: string;
    subHintIcon?: string;
    children?: Snippet;
    action?: Snippet;
    subHintSlot?: Snippet;
    onAction?: () => void;
    onSecondaryAction?: () => void;
  } = $props();

  const hasDescription = $derived(Boolean(children) || Boolean(description));
  const hasActionZone = $derived(Boolean(action || actionLabel || secondaryActionLabel));
  const hasSubHint = $derived(Boolean(subHintSlot || subHint));
</script>

<div class="arcana-action-panel">
  <div class="arcana-action-panel__visual">
    <div class="arcana-action-panel__ring"></div>
    <div class="arcana-action-panel__ring arcana-action-panel__ring--2"></div>
    <div class="arcana-action-panel__icon">
      <i class={icon}></i>
    </div>
  </div>

  <h3 class="arcana-action-panel__title">{title}</h3>

  {#if hasDescription}
    <p class="arcana-action-panel__desc">
      {#if children}{@render children()}{:else}{description}{/if}
    </p>
  {/if}

  {#if hasActionZone}
    <div class="arcana-action-panel__action">
      {#if action}
        {@render action()}
      {:else}
        {#if actionLabel}
          <ArcanaButton
            variant="primary"
            disabled={actionLoading}
            onClick={() => onAction?.()}
          >
            {#if actionLoading}
              <i class="fa-solid fa-spinner fa-spin"></i>
            {:else if actionIcon}
              <i class={actionIcon}></i>
            {/if}
            <span>{actionLabel}</span>
          </ArcanaButton>
        {/if}
        {#if secondaryActionLabel}
          <ArcanaButton
            variant="outline"
            onClick={() => onSecondaryAction?.()}
          >
            {#if secondaryActionIcon}
              <i class={secondaryActionIcon}></i>
            {/if}
            <span>{secondaryActionLabel}</span>
          </ArcanaButton>
        {/if}
      {/if}
    </div>
  {/if}

  {#if hasSubHint}
    <p class="arcana-action-panel__sub-hint">
      {#if subHintSlot}
        {@render subHintSlot()}
      {:else}
        {#if subHintIcon}
          <i class={subHintIcon}></i>
        {/if}
        <span>{subHint}</span>
      {/if}
    </p>
  {/if}
</div>
