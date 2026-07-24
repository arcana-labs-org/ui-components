<script lang="ts">
  /**
   * `<ShadcnOnboardingPanel>` — Svelte 5 port do SFC Vue. Empty state / CTA panel pra
   * primeiras configurações. Markup/classes `shadcn-onboarding*` idênticos ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - slot default → snippet `children` (fallback: `description`)
   * - slot `#action` → snippet `action` (substitui a CTA padrão)
   * - slot `#sub-hint` → snippet `subHintSlot` (substitui o sub-hint padrão)
   * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
   */
  import type { Snippet } from "svelte";

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

<div class="shadcn-onboarding">
  <div class="shadcn-onboarding__visual">
    <div class="shadcn-onboarding__ring"></div>
    <div class="shadcn-onboarding__ring shadcn-onboarding__ring--2"></div>
    <div class="shadcn-onboarding__icon">
      <i class={icon}></i>
    </div>
  </div>

  <h3 class="shadcn-onboarding__title">{title}</h3>

  {#if hasDescription}
    <p class="shadcn-onboarding__desc">
      {#if children}{@render children()}{:else}{description}{/if}
    </p>
  {/if}

  {#if hasActionZone}
    <div class="shadcn-onboarding__action">
      {#if action}
        {@render action()}
      {:else}
        {#if actionLabel}
          <button
            class="shadcn-onboarding__cta"
            disabled={actionLoading}
            onclick={() => onAction?.()}
          >
            {#if actionLoading}
              <i class="fa-solid fa-spinner fa-spin"></i>
            {:else if actionIcon}
              <i class={actionIcon}></i>
            {/if}
            <span>{actionLabel}</span>
          </button>
        {/if}
        {#if secondaryActionLabel}
          <button
            class="shadcn-onboarding__cta shadcn-onboarding__cta--secondary"
            onclick={() => onSecondaryAction?.()}
          >
            {#if secondaryActionIcon}
              <i class={secondaryActionIcon}></i>
            {/if}
            <span>{secondaryActionLabel}</span>
          </button>
        {/if}
      {/if}
    </div>
  {/if}

  {#if hasSubHint}
    <p class="shadcn-onboarding__sub-hint">
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
