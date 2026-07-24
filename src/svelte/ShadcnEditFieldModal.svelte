<script lang="ts">
  /**
   * `<ShadcnEditFieldModal>` — Svelte 5 port do SFC Vue. Wrapper genérico pra modais de
   * "Alterar X" em listas de configurações. Reusa o `<ShadcnDialog>` (que por sua vez usa
   * o `dialog-stack` compartilhado — `acquireZIndex`/`releaseZIndex`).
   *
   * Equivalências Vue → Svelte 5:
   * - API ref-based (`this.$refs.modal.show()`) → `export function show()/hide()` (delegam
   *   pro `<ShadcnDialog>` interno via `bind:this`), acessível via `bind:this` no componente
   * - slot default (input específico) → snippet `children`
   * - slot `#footer` (botões cancelar/salvar) → renderizado internamente via LabeledButton
   * - `emit('save')` → callback `onSave` (sem auto-close — caller fecha via `hide()`)
   */
  import type { Snippet } from "svelte";
  import ShadcnDialog from "./ShadcnDialog.svelte";
  import LabeledButton from "./LabeledButton.svelte";

  let {
    title,
    description = "",
    cancelLabel = "Cancelar",
    saveLabel = "Salvar Alterações",
    cancelColor = "white",
    saveColor = "primary-700",
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

  let dialog: ShadcnDialog;

  export function show() {
    dialog?.show();
  }
  export function hide() {
    dialog?.hide();
  }
</script>

<ShadcnDialog bind:this={dialog} {title} {description} {size}>
  {@render children?.()}

  {#snippet footer(hide)}
    <LabeledButton label={cancelLabel} color={cancelColor} class={cancelClass} shadcn onClick={hide} />
    <LabeledButton
      label={saveLabel}
      color={saveColor}
      class={saveClass}
      shadcn
      onClick={() => onSave?.()}
    />
  {/snippet}
</ShadcnDialog>
