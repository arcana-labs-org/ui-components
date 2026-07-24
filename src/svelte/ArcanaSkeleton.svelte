<script lang="ts">
  /**
   * `<ArcanaSkeleton>` — Svelte 5 port. Placeholder shimmer. Reproduz
   * `<span class="arcana-skeleton arcana-skeleton--rounded-${rounded}">` com width/height
   * inline e `aria-hidden`, idêntico ao SFC Vue.
   */
  let {
    width = "100%",
    height = "14px",
    rounded = "md",
    class: className = "",
  }: {
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full" | "none";
    class?: string;
  } = $props();

  const classes = $derived(
    ["arcana-skeleton", `arcana-skeleton--rounded-${rounded}`, className].filter(Boolean).join(" ")
  );
</script>

<span class={classes} style={`width: ${width}; height: ${height};`} aria-hidden="true"></span>
