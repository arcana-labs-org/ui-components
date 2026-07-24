<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ShadcnBadge>` — Svelte 5 port. Pill/badge shadcn. Emite `span.shadcn-badge` +
   * `shadcn-badge--${variant}` (+ `--sm`, `--clickable`) e o `span.shadcn-badge__dot`
   * opcional, idêntico ao SFC Vue.
   *
   * Equivalências Vue → Svelte 5:
   * - slot default → snippet `children`
   * - `@click` no root → callback `onClick`
   */
  type Variant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";

  let {
    variant = "neutral",
    dot = false,
    size = "md",
    clickable = false,
    onClick,
    class: className = "",
    children,
  }: {
    variant?: Variant;
    dot?: boolean;
    size?: "sm" | "md";
    clickable?: boolean;
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  const classes = $derived(
    [
      "shadcn-badge",
      `shadcn-badge--${variant}`,
      size === "sm" ? "shadcn-badge--sm" : "",
      clickable ? "shadcn-badge--clickable" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<span class={classes} onclick={(ev) => onClick?.(ev)}>
  {#if dot}<span class="shadcn-badge__dot"></span>{/if}
  {@render children?.()}
</span>
