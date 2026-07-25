<script lang="ts">
  /**
   * `<ArcanaContextMenuItem>` — Svelte 5 port do SFC Vue. Item do
   * `<ArcanaContextMenu>`: ícone + label + (opcional) atalho no `suffix`.
   *
   * Equivalências Vue → Svelte 5:
   * - `inject('arcanaContextMenu')` → `getContext(CONTEXT_MENU_CONTEXT)`
   * - slot default → snippet `children`; slot `#suffix` → `suffix` (string OU snippet)
   * - `emit('click')` / `emit('select')` → callbacks `onClick` / `onSelect`
   *
   * `tabindex="-1"`: quem tem o foco é o painel; ↑/↓ movem o foco entre os itens
   * (roving tabindex do padrão WAI-ARIA de menu).
   */
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import {
    CONTEXT_MENU_CONTEXT,
    type ContextMenuContextValue,
  } from "./context-menu-context";
  import type { ArcanaContextMenuVariant } from "../core/context-menu";

  let {
    icon = "",
    suffix = undefined,
    variant = "default",
    disabled = false,
    divided = false,
    closeOnClick = true,
    children,
    onClick,
    onSelect,
  }: {
    icon?: string;
    suffix?: string | Snippet;
    variant?: ArcanaContextMenuVariant;
    disabled?: boolean;
    divided?: boolean;
    closeOnClick?: boolean;
    children?: Snippet;
    onClick?: (e: MouseEvent) => void;
    onSelect?: (e: MouseEvent) => void;
  } = $props();

  // Contexto do `<ArcanaContextMenu>` pai (fallback quando usado solto).
  const ctx = getContext<ContextMenuContextValue | undefined>(CONTEXT_MENU_CONTEXT);

  const classes = $derived(
    [
      "arcana-context-menu-item",
      variant ? `arcana-context-menu-item--${variant}` : "",
      disabled ? "is-disabled" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );

  function handleClick(e: MouseEvent) {
    if (disabled) return;
    onClick?.(e);
    onSelect?.(e);
    if (closeOnClick) ctx?.close();
  }
</script>

{#if divided}
  <div class="arcana-context-menu-item__separator"></div>
{/if}

<button
  type="button"
  class={classes}
  {disabled}
  role="menuitem"
  tabindex="-1"
  onclick={handleClick}
>
  {#if icon}
    <i class={`arcana-context-menu-item__icon ${icon}`} aria-hidden="true"></i>
  {/if}
  <span class="arcana-context-menu-item__label">{@render children?.()}</span>
  {#if suffix}
    <span class="arcana-context-menu-item__suffix">
      {#if typeof suffix === "function"}{@render suffix()}{:else}{suffix}{/if}
    </span>
  {/if}
</button>
