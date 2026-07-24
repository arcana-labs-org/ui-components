<script lang="ts">
  /**
   * `<ShadcnDialog>` — Svelte 5 port do SFC Vue. Modal shadcn-style com API imperativa
   * (`show()` / `hide()`), espelhando a API ref-based do SFC (`this.$refs.dialog.show()`).
   *
   * Equivalências Vue → Svelte 5:
   * - `<Teleport to="body">` → action `use:portal` (move o overlay pro body)
   * - API ref-based (`show()`/`hide()`) → `export function show()/hide()` acessível via
   *   `bind:this` no componente (mesma abordagem imperativa do ShadcnTable/datatable)
   * - `emit('show'|'hide')` → callbacks `onShow` / `onHide`
   * - slots `header` / `footer` / default → snippets `header` / `footer` (recebe `hide`) / `children`
   * - z-index dinâmico via o mesmo `dialog-stack` compartilhado (stacking de modais aninhados)
   *
   * A transição fade+zoom do Vue é omitida (mesma decisão dos outros ports com portal).
   */
  import type { Snippet } from "svelte";
  import { tick } from "svelte";
  import { portal } from "./portal";
  import { acquireZIndex, releaseZIndex } from "../vue/services/dialog-stack";

  type ShadcnDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;

  let {
    title = "",
    description = "",
    size = "md",
    fullHeight = false,
    closeable = true,
    contentClass = "",
    closeOnOverlayClick = false,
    closeOnEscape = true,
    noBodyPadding = false,
    bodyScrollable = true,
    flatFooter = false,
    header,
    footer,
    children,
    onShow,
    onHide,
  }: {
    title?: string;
    description?: string;
    size?: ShadcnDialogSize;
    fullHeight?: boolean;
    closeable?: boolean;
    contentClass?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    noBodyPadding?: boolean;
    bodyScrollable?: boolean;
    flatFooter?: boolean;
    header?: Snippet;
    footer?: Snippet<[() => void]>;
    children?: Snippet;
    onShow?: () => void;
    onHide?: () => void;
  } = $props();

  const SIZE_PRESETS: Record<string, string> = {
    sm: "470px",
    md: "580px",
    lg: "720px",
    xl: "880px",
    full: "90vw",
  };

  let visible = $state(false);
  let zIndex = $state(10000);
  let contentEl: HTMLDivElement | null = $state(null);

  const resolvedMaxWidth = $derived(
    typeof size === "number" ? `${size}px` : (SIZE_PRESETS[size as string] ?? SIZE_PRESETS.md)
  );

  // ── API imperativa (acessível via `bind:this`) ─────────────────────────────
  export function show() {
    // Pega o próximo nível do stack compartilhado (overlay = N, content = N + 1).
    zIndex = acquireZIndex();
    visible = true;
    onShow?.();
    tick().then(focusFirstElement);
  }

  export function hide() {
    if (!visible) return;
    visible = false;
    releaseZIndex();
    onHide?.();
  }

  function focusFirstElement() {
    const root = contentEl;
    if (!root) return;
    const focusable = root.querySelector<HTMLElement>(
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    (focusable ?? root).focus?.();
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget && closeOnOverlayClick) hide();
  }

  // Escape fecha (configurável). Listener global montado enquanto visível.
  $effect(() => {
    if (!visible) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        e.preventDefault();
        hide();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const showHeader = $derived(Boolean(title || header));

  const contentClasses = $derived(
    [
      "shadcn-dialog-content",
      fullHeight ? "shadcn-dialog-content--full-height" : "",
      contentClass,
    ]
      .filter(Boolean)
      .join(" ")
  );
  const bodyClasses = $derived(
    [
      "shadcn-dialog-body",
      noBodyPadding ? "shadcn-dialog-body--no-padding" : "",
      !bodyScrollable ? "shadcn-dialog-body--no-scroll" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
  const footerClasses = $derived(
    ["shadcn-dialog-footer", flatFooter ? "shadcn-dialog-footer--flat" : ""]
      .filter(Boolean)
      .join(" ")
  );
</script>

{#if visible}
  <div
    use:portal
    class="shadcn-dialog-overlay"
    style={`z-index:${zIndex};`}
    onclick={handleOverlayClick}
    role="presentation"
  >
    <div
      bind:this={contentEl}
      class={contentClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "shadcn-dialog-title" : undefined}
      aria-describedby={description ? "shadcn-dialog-desc" : undefined}
      style={`max-width:${resolvedMaxWidth};z-index:${zIndex + 1};`}
    >
      {#if showHeader}
        <header class="shadcn-dialog-header">
          {#if header}
            {@render header()}
          {:else}
            <h2 id="shadcn-dialog-title" class="shadcn-dialog-title">{title}</h2>
            {#if description}
              <p id="shadcn-dialog-desc" class="shadcn-dialog-description">{description}</p>
            {/if}
          {/if}
          {#if closeable}
            <button
              type="button"
              class="shadcn-dialog-close"
              aria-label="Fechar"
              onclick={hide}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          {/if}
        </header>
      {/if}

      <div class={bodyClasses}>{@render children?.()}</div>

      {#if footer}
        <footer class={footerClasses}>{@render footer(hide)}</footer>
      {/if}
    </div>
  </div>
{/if}
