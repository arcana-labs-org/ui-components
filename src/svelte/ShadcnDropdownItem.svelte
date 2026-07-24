<script lang="ts">
  /**
   * `<ShadcnDropdownItem>` — Svelte 5 port do SFC Vue. Item do `<ShadcnDropdown>`:
   * ícone + label + (opcional) suffix.
   *
   * Equivalências Vue → Svelte 5:
   * - `inject('shadcnDropdownSize')` → `getContext(DROPDOWN_CONTEXT)` (herda densidade do pai)
   * - CustomEvent `shadcn-dropdown-close` → chama `ctx.close()` direto quando `closeOnClick`
   * - slot default → snippet `children`; slot `#suffix` → snippet `suffix`
   * - `emit('click')` → callback `onClick`
   */
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import {
    DROPDOWN_CONTEXT,
    type DropdownContextValue,
    type ShadcnDropdownSize,
  } from "./ShadcnDropdown.svelte";

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
    size?: ShadcnDropdownSize | null;
    suffix?: Snippet;
    children?: Snippet;
    onClick?: (e: MouseEvent) => void;
  } = $props();

  // Contexto do `<ShadcnDropdown>` pai (fallback quando usado standalone).
  const ctx = getContext<DropdownContextValue | undefined>(DROPDOWN_CONTEXT);

  const effectiveSize = $derived(size ?? ctx?.size ?? "default");

  const classes = $derived(
    [
      "shadcn-dropdown-item",
      variant ? `shadcn-dropdown-item--${variant}` : "",
      effectiveSize === "comfortable" ? "shadcn-dropdown-item--comfortable" : "",
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
  <div class="shadcn-dropdown-item__separator"></div>
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
      class={`shadcn-dropdown-item__icon ${icon}`}
      style={iconColor ? `color:${iconColor};` : undefined}
      aria-hidden="true"
    ></i>
  {/if}
  <span class="shadcn-dropdown-item__label">{@render children?.()}</span>
  {#if suffix}
    <span class="shadcn-dropdown-item__suffix">{@render suffix()}</span>
  {/if}
</button>
