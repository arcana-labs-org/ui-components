<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface ShadcnTableColumn {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "right";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueGetter?: (value: any, row: any, index: number) => any;
    /** Render custom da célula (equivale ao slot `#cell-<key>` do SFC). */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: Snippet<[{ row: any; value: any; index: number }]>;
  }
</script>

<script lang="ts">
  /**
   * `<ShadcnTable>` — Svelte 5 port. Tabela estática (dados locais) shadcn. Reproduz
   * `<div class="shadcn-table-wrap"><table class="shadcn-table">`, o `thead`/`tbody`/`tfoot`,
   * `__th--right`/`__td--right`, `__empty` e `__foot`, idêntico ao SFC.
   *
   * Equivalências: slot de célula `#cell-<key>` → `col.render` (snippet);
   * slot `#footer` → snippet `footer`.
   */
  let {
    columns,
    rows = [],
    emptyText = "Nenhum registro.",
    footer,
    class: className = "",
  }: {
    columns: ShadcnTableColumn[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows?: any[];
    emptyText?: string;
    footer?: Snippet;
    class?: string;
  } = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formatCell(row: any, col: ShadcnTableColumn, index: number): any {
    const value = row?.[col.key];
    if (col.valueGetter) return col.valueGetter(value, row, index);
    return value ?? "—";
  }
</script>

<div class={["shadcn-table-wrap", className].filter(Boolean).join(" ")}>
  <table class="shadcn-table">
    <thead>
      <tr>
        {#each columns as col (col.key)}
          <th
            style={col.width ? `width:${col.width};` : undefined}
            class={col.align === "right" ? "shadcn-table__th--right" : undefined}
          >
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if !rows.length}
        <tr>
          <td colspan={columns.length} class="shadcn-table__empty">{emptyText}</td>
        </tr>
      {:else}
        {#each rows as row, i (i)}
          <tr>
            {#each columns as col (col.key)}
              <td class={col.align === "right" ? "shadcn-table__td--right" : undefined}>
                {#if col.render}{@render col.render({ row, value: row?.[col.key], index: i })}{:else}{formatCell(row, col, i)}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
    {#if footer}
      <tfoot class="shadcn-table__foot">{@render footer()}</tfoot>
    {/if}
  </table>
</div>
