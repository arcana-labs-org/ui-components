<script lang="ts" module>
  /**
   * Mapeia o `color` legado pra variant semântica do shadcn — idêntico ao SFC Vue
   * e ao port React.
   */
  export function shadcnVariantFrom(color: string): string {
    const c = String(color ?? "").toLowerCase();
    const isDanger = c.startsWith("danger") || c.startsWith("error") || c.startsWith("red");
    if (isDanger && c.includes("outline")) return "destructive-outline";
    if (isDanger) return "destructive";
    if (c === "white" || c.startsWith("grey") || c.startsWith("gray") || c.startsWith("slate")) return "ghost";
    if (c.startsWith("teal")) return "teal";
    if (c.startsWith("success") || c.startsWith("green") || c.startsWith("emerald")) return "success";
    if (c.startsWith("blue") || c.startsWith("sky") || c.startsWith("azure")) return "info";
    if (c.startsWith("amber") || c.startsWith("orange") || c.startsWith("yellow")) return "warning";
    if (c.startsWith("indigo") || c.startsWith("violet") || c.startsWith("purple")) return "alert";
    return "primary";
  }
</script>

<script lang="ts">
  /**
   * `<LabeledButton>` — Svelte 5 port do SFC Vue. Reproduz o mesmo markup/classes do
   * componente base (shadcn `shadcn-btn shadcn-btn--${variant}` OU legado
   * `btn bg-{color} btn-labeled`), incluindo o mapping de `color` legado → variant.
   *
   * Equivalências Vue → Svelte 5:
   * - `emit('click', $event)` → callback `onClick`
   * - `class` extra do caller → prop `class`
   */
  let {
    icon = "",
    color = "info-700",
    disabled = false,
    label,
    shadcn = false,
    loading = false,
    centerLabel = false,
    centerContent = false,
    onClick,
    class: className = "",
    ...rest
  }: {
    icon?: string;
    color?: string;
    disabled?: boolean;
    label: string;
    shadcn?: boolean;
    loading?: boolean;
    centerLabel?: boolean;
    centerContent?: boolean;
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const classes = $derived.by(() => {
    const list: string[] = [];
    if (shadcn) {
      list.push("shadcn-btn", `shadcn-btn--${shadcnVariantFrom(color)}`);
      if (centerLabel) list.push("shadcn-btn--center-label");
      else if (centerContent) list.push("shadcn-btn--center-content");
    } else {
      list.push("btn", `bg-${color}`, "btn-labeled");
    }
    if (className && typeof className === "string") list.push(className);
    return list.join(" ");
  });

  function handleClick(ev: MouseEvent) {
    ev.preventDefault();
    onClick?.(ev);
  }
</script>

<button
  {...rest}
  type="button"
  disabled={Boolean(disabled) || Boolean(loading)}
  class={classes}
  onclick={handleClick}
>
  {#if shadcn}
    {#if loading}
      <i class="fa-solid fa-spinner fa-spin shadcn-btn__icon"></i>
    {:else if icon}
      <i class={`${icon} shadcn-btn__icon`}></i>
    {/if}
    <span>{label}</span>
  {:else}
    <b><i class={loading ? "fa-solid fa-spinner fa-spin" : icon} style="font-size: 15px;"></i></b>
    {label}
  {/if}
</button>
