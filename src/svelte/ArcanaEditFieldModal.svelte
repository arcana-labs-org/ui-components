<script lang="ts">
  /**
   * `<ArcanaEditFieldModal>` — Svelte 5 port do SFC Vue. Wrapper genérico pra modais de
   * "Alterar X" em listas de configurações. Reusa o `<ArcanaDialog>` (que por sua vez usa
   * o `dialog-stack` compartilhado — `acquireZIndex`/`releaseZIndex`).
   *
   * Equivalências Vue → Svelte 5:
   * - API ref-based (`this.$refs.modal.show()`) → `export function show()/hide()` (delegam
   *   pro `<ArcanaDialog>` interno via `bind:this`), acessível via `bind:this` no componente
   * - slot default (input específico) → snippet `children`
   * - slot `#footer` (botões cancelar/salvar) → renderizado internamente via ArcanaButton
   * - `emit('save')` → callback `onSave` (sem auto-close — caller fecha via `hide()`)
   */
  import type { Snippet } from "svelte";
  import ArcanaDialog from "./ArcanaDialog.svelte";
  import ArcanaButton from "./ArcanaButton.svelte";

  let {
    title,
    description = "",
    cancelLabel = "Cancelar",
    saveLabel = "Salvar Alterações",
    cancelColor = "ghost",
    saveColor = "primary",
    cancelClass = "",
    saveClass = "",
    size = "md",
    children,
    onSave,
  }: {
    title: string;
    description?: string;
    cancelLabel?: string;
    saveLabel?: string;
    cancelColor?: string;
    saveColor?: string;
    cancelClass?: string;
    saveClass?: string;
    size?: "sm" | "md" | "lg" | "xl" | number;
    children?: Snippet;
    onSave?: () => void;
  } = $props();

  let dialog: ArcanaDialog;

  export function show() {
    dialog?.show();
  }
  export function hide() {
    dialog?.hide();
  }
</script>

<ArcanaDialog bind:this={dialog} {title} {description} {size}>
  {@render children?.()}

  {#snippet footer(hide)}
    <ArcanaButton variant={cancelColor} class={cancelClass} onClick={hide}>{cancelLabel}</ArcanaButton>
    <ArcanaButton variant={saveColor} class={saveClass} onClick={() => onSave?.()}>{saveLabel}</ArcanaButton>
  {/snippet}
</ArcanaDialog>
