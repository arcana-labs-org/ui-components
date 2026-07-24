<script lang="ts">
  /**
   * `<ArcanaDropdownItem>` — Svelte 5 port do SFC Vue. Item do `<ArcanaDropdown>`:
   * ícone + label + (opcional) suffix.
   *
   * Equivalências Vue → Svelte 5:
   * - `inject('shadcnDropdownSize')` → `getContext(DROPDOWN_CONTEXT)` (herda densidade do pai)
   * - CustomEvent `arcana-dropdown-close` → chama `ctx.close()` direto quando `closeOnClick`
   * - slot default → snippet `children`; slot `#suffix` → snippet `suffix`
   * - `emit('click')` → callback `onClick`
   */
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import {
    DROPDOWN_CONTEXT,
    type DropdownContextValue,
    type ArcanaDropdownSize,
  } from "./ArcanaDropdown.svelte";

  let {
    icon = "",
    iconColor = "",
    variant = "default",
    disabled = false,
    divided = false,
    closeOnClick = true,
    size = null,
    suffix,
    children,
    onClick,
  }: {
    icon?: string;
    iconColor?: string;
    variant?: "default" | "danger" | "success" | "warning";
    disabled?: boolean;
    divided?: boolean;
    closeOnClick?: boolean;
    size?: ArcanaDropdownSize | null;
    suffix?: Snippet;
    children?: Snippet;
    onClick?: (e: MouseEvent) => void;
  } = $props();

  // Contexto do `<ArcanaDropdown>` pai (fallback quando usado standalone).
  const ctx = getContext<DropdownContextValue | undefined>(DROPDOWN_CONTEXT);

  const effectiveSize = $derived(size ?? ctx?.size ?? "default");

  const classes = $derived(
    [
      "arcana-dropdown-item",
      variant ? `arcana-dropdown-item--${variant}` : "",
      effectiveSize === "comfortable" ? "arcana-dropdown-item--comfortable" : "",
      disabled ? "is-disabled" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );

  function handleClick(e: MouseEvent) {
    if (disabled) return;
    onClick?.(e);
    if (closeOnClick) ctx?.close();
  }
</script>

{#if divided}
  <div class="arcana-dropdown-item__separator"></div>
{/if}

<button
  type="button"
  class={classes}
  {disabled}
  role="menuitem"
  onclick={handleClick}
>
  {#if icon}
    <i
      class={`arcana-dropdown-item__icon ${icon}`}
      style={iconColor ? `color:${iconColor};` : undefined}
      aria-hidden="true"
    ></i>
  {/if}
  <span class="arcana-dropdown-item__label">{@render children?.()}</span>
  {#if suffix}
    <span class="arcana-dropdown-item__suffix">{@render suffix()}</span>
  {/if}
</button>
