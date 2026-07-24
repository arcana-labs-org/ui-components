<script lang="ts" module>
  export type SpecSheetAccentColor =
    | "blue"
    | "emerald"
    | "amber"
    | "rose"
    | "violet"
    | "indigo"
    | "teal"
    | "slate";
</script>

<script lang="ts">
  /**
   * `<ShadcnSpecSheetSection>` — Svelte 5 port do SFC Vue. Section interna do
   * `<ShadcnSpecSheet>`: ícone boxed colorido opcional + título + section-num + actions +
   * grid de fields (`<ShadcnSpecSheetField>`).
   *
   * Equivalências Vue → Svelte 5:
   * - slots `#title` / `#actions` → snippets homônimos (fallback pra prop `title`)
   * - slot default (fields) → snippet `children`
   */
  import type { Snippet } from "svelte";

  let {
    title = "",
    sectionNum = "",
    icon = "",
    iconColor = "slate",
    columns = 2,
    noRowDividers = false,
    compact = false,
    actions,
    children,
  }: {
    title?: string | Snippet;
    sectionNum?: string;
    icon?: string;
    iconColor?: SpecSheetAccentColor;
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | string;
    noRowDividers?: boolean;
    compact?: boolean;
    actions?: Snippet;
    children?: Snippet;
  } = $props();

  const hasHeader = $derived(
    Boolean(title) || Boolean(sectionNum) || Boolean(icon) || Boolean(actions)
  );

  const sectionClasses = $derived(
    ["shadcn-spec-sheet__section", compact ? "shadcn-spec-sheet__section--compact" : ""]
      .filter(Boolean)
      .join(" ")
  );

  const gridClasses = $derived(
    [
      "shadcn-spec-sheet__grid",
      `shadcn-spec-sheet__grid--cols-${columns}`,
      noRowDividers ? "shadcn-spec-sheet__grid--no-row-dividers" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<section class={sectionClasses}>
  {#if hasHeader}
    <header class="shadcn-spec-sheet__section-head">
      <div class="shadcn-spec-sheet__section-head-left">
        {#if icon}
          <span
            class={`shadcn-spec-sheet__section-icon shadcn-spec-sheet__section-icon--${iconColor}`}
            aria-hidden="true"
          >
            <i class={icon}></i>
          </span>
        {/if}
        <h3 class="shadcn-spec-sheet__section-title">
          {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
        </h3>
      </div>
      <div class="shadcn-spec-sheet__section-head-right">
        {#if sectionNum}
          <span class="shadcn-spec-sheet__section-num">{sectionNum}</span>
        {/if}
        {@render actions?.()}
      </div>
    </header>
  {/if}

  <div class={gridClasses}>{@render children?.()}</div>
</section>
