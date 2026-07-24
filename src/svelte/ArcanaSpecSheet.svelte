<script lang="ts">
  /**
   * `<ArcanaSpecSheet>` — Svelte 5 port do SFC Vue. Display read-only de dados em formato
   * editorial/spec sheet. Markup/classes `arcana-spec-sheet*` idênticos ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - slots `#header` / `#title` / `#meta` / `#footer` → snippets homônimos
   * - slot default (sections) → snippet `children`
   */
  import type { Snippet } from "svelte";

  let {
    docNum = "",
    title = "",
    metaLabel = "",
    flat = false,
    header,
    meta,
    footer,
    children,
  }: {
    docNum?: string;
    title?: string | Snippet;
    metaLabel?: string;
    flat?: boolean;
    header?: Snippet;
    meta?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  } = $props();

  const hasMeta = $derived(Boolean(metaLabel) || Boolean(meta));
  const hasHeader = $derived(
    Boolean(docNum) || Boolean(title) || Boolean(metaLabel) || Boolean(header) || Boolean(meta)
  );

  const rootClasses = $derived(
    ["arcana-spec-sheet", flat ? "arcana-spec-sheet--flat" : ""].filter(Boolean).join(" ")
  );
</script>

<article class={rootClasses}>
  {#if hasHeader}
    <header class="arcana-spec-sheet__header">
      {#if header}
        {@render header()}
      {:else}
        <div>
          {#if docNum}
            <div class="arcana-spec-sheet__doc-num">{docNum}</div>
          {/if}
          {#if title}
            <h2 class="arcana-spec-sheet__doc-title">
              {#if typeof title === "function"}{@render title()}{:else}{title}{/if}
            </h2>
          {/if}
        </div>
        {#if hasMeta}
          <div class="arcana-spec-sheet__meta">
            {#if metaLabel}
              <div class="arcana-spec-sheet__meta-label">{metaLabel}</div>
            {/if}
            {@render meta?.()}
          </div>
        {/if}
      {/if}
    </header>
  {/if}

  {@render children?.()}

  {#if footer}
    <footer class="arcana-spec-sheet__footer">{@render footer()}</footer>
  {/if}
</article>
