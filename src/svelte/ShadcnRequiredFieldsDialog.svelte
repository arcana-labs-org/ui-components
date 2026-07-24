<script lang="ts" module>
  export interface RequiredField {
    key: string;
    label: string;
    hint: string;
  }
</script>

<script lang="ts">
  /**
   * `<ShadcnRequiredFieldsDialog>` — Svelte 5 port do SFC Vue. Dialog amber/warning que
   * lista campos obrigatórios pendentes. Reusa o `<ShadcnDialog>` (`dialog-stack`
   * compartilhado) com header/footer via snippets.
   *
   * API imperativa (`export function show()/hide()`) delegando pro `<ShadcnDialog>` interno.
   */
  import ShadcnDialog from "./ShadcnDialog.svelte";
  import LabeledButton from "./LabeledButton.svelte";

  let {
    title = "Faltam campos obrigatórios",
    description = "Os campos abaixo precisam ser preenchidos antes de continuar.",
    fields = [],
    buttonLabel = "Voltar e corrigir",
    size = 560,
  }: {
    title?: string;
    description?: string;
    fields?: RequiredField[];
    buttonLabel?: string;
    size?: number | string;
  } = $props();

  let dialog: ShadcnDialog;

  export function show() {
    dialog?.show();
  }
  export function hide() {
    dialog?.hide();
  }
</script>

<ShadcnDialog bind:this={dialog} size={size as number} flatFooter>
  {#snippet header()}
    <div class="rf-header">
      <div class="rf-header__icon">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <div class="rf-header__text">
        <h2 class="rf-header__title">{title}</h2>
        <p class="rf-header__desc">{description}</p>
      </div>
    </div>
  {/snippet}

  <div class="rf-list">
    {#each fields as field (field.key)}
      <div class="rf-item">
        <div class="rf-item__icon">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div class="rf-item__body">
          <div class="rf-item__label">{field.label}</div>
          <div class="rf-item__hint">{field.hint}</div>
        </div>
      </div>
    {/each}
  </div>

  {#snippet footer(hide)}
    <LabeledButton
      label={buttonLabel}
      icon="fa-solid fa-arrow-left"
      color="amber-600"
      shadcn
      onClick={hide}
    />
  {/snippet}
</ShadcnDialog>
