<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * `<ArcanaButton>` — Svelte 5 port do SFC Vue. Emite o MESMO markup/classes
   * (`arcana-button`, `arcana-button--${variant}`, `is-disabled`), reusando o CSS
   * compartilhado (`@arcanalabs/ui-components/styles.css`).
   *
   * Equivalências Vue → Svelte 5 (runes):
   * - slot default → snippet `children`
   * - `emit('click', ev)` → callback prop `onClick(ev)`
   */
  type Variant =
    | "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive"
    | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert"
    | "info" | "warning" | "teal";

  let {
    variant = "primary",
    type = "button",
    disabled = false,
    onClick,
    class: className = "",
    children,
  }: {
    variant?: Variant;
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    children?: Snippet;
  } = $props();

  const classes = $derived(
    ["arcana-button", `arcana-button--${variant}`, disabled ? "is-disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );
</script>

<button {type} class={classes} {disabled} onclick={(ev) => onClick?.(ev)}>
  {@render children?.()}
</button>
