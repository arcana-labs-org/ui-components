<script lang="ts" module>
  export type NoticeVariant =
    | "info" | "blue" | "success" | "warning" | "pending" | "destructive";

  const VARIANT_DEFAULT_ICONS: Record<NoticeVariant, string> = {
    info: "fa-solid fa-circle-info",
    blue: "fa-solid fa-circle-info",
    success: "fa-solid fa-circle-check",
    warning: "fa-solid fa-triangle-exclamation",
    pending: "fa-solid fa-clock",
    destructive: "fa-solid fa-circle-exclamation",
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ShadcnNotice>` — Svelte 5 port. Banner informativo com variants semânticas. Reproduz
   * `<div class="shadcn-notice shadcn-notice--${variant}">` com `__icon`/`__content`/
   * `__title`/`__body` e o botão `__close` opcional, idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - slot default → snippet `children`; slots `#title`/`#icon` → props `title`/`iconNode`
   * - `emit('dismiss')` → `onDismiss`
   */
  let {
    variant = "info",
    title = "",
    icon = "",
    iconNode,
    showIcon = true,
    dismissible = false,
    onDismiss,
    class: className = "",
    children,
  }: {
    variant?: NoticeVariant;
    title?: string | Snippet;
    icon?: string;
    iconNode?: Snippet;
    showIcon?: boolean;
    dismissible?: boolean;
    onDismiss?: () => void;
    class?: string;
    children?: Snippet;
  } = $props();

  const resolvedIcon = $derived(icon || VARIANT_DEFAULT_ICONS[variant]);
  const rootClasses = $derived(
    ["shadcn-notice", `shadcn-notice--${variant}`, className].filter(Boolean).join(" ")
  );
</script>

<div class={rootClasses} role="status">
  {#if showIcon}
    <span class="shadcn-notice__icon" aria-hidden="true">
      {#if iconNode}{@render iconNode()}{:else}<i class={resolvedIcon}></i>{/if}
    </span>
  {/if}

  <div class="shadcn-notice__content">
    {#if title}
      <strong class="shadcn-notice__title">
        {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
      </strong>
    {/if}
    <div class="shadcn-notice__body">{@render children?.()}</div>
  </div>

  {#if dismissible}
    <button type="button" class="shadcn-notice__close" aria-label="Fechar" onclick={() => onDismiss?.()}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  {/if}
</div>
