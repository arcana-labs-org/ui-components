<script lang="ts" module>
  export interface EditableFieldSelectOption {
    label: string;
    value: string | number | boolean | null;
  }
</script>

<script lang="ts">
  /**
   * `<ArcanaSettingsEditableField>` — Svelte 5 port do SFC Vue. Item smart de
   * `<ArcanaSettingsList>` que combina display read-only + botão "Alterar" + modal de
   * edição (`<ArcanaEditFieldDialog>`) numa única tag.
   *
   * Equivalências Vue → Svelte 5:
   * - `v-model` (`modelValue`) → prop `value` + `onValueChange`; `emit('save')` → `onSave`
   * - buffer (`bufferValue`) snapshotado ao abrir; cancelar descarta; salvar emite
   *   `onValueChange(buffer)` + `onSave(buffer)` e fecha (idêntico ao SFC)
   * - `<Teleport>` do modal → o próprio `<ArcanaEditFieldDialog>` já usa portal
   *
   * FormGroup: o SFC referencia um `<FormGroup>` GLOBAL do app host (não portável). No
   * Svelte, o campo do modal é envolvido por um wrapper mínimo (`demo-form-group`, label +
   * input). Passe o snippet `formGroup` (recebe `{ label, input }`, onde `input` é um snippet
   * com o input já ligado ao buffer) pra substituir pelo kit de form do app consumidor —
   * mesma ideia da render-prop `formGroup` do port React e do `TemplateRef` do Angular.
   */
  import type { Snippet } from "svelte";
  import ArcanaSettingsListItem from "./ArcanaSettingsListItem.svelte";
  import ArcanaEditFieldDialog from "./ArcanaEditFieldDialog.svelte";
  import ArcanaInput from "./ArcanaInput.svelte";
  import ArcanaSelect from "./ArcanaSelect.svelte";
  import ArcanaInputCurrency from "./ArcanaInputCurrency.svelte";
  import { CurrencyFormatter } from "../core/currency";

  let {
    value = null,
    label,
    caption = "",
    type = "text",
    options = [],
    disabled = false,
    nested = false,
    displayFormatter,
    modalTitle = "",
    modalDescription = "",
    inputLabel = "",
    inputPlaceholder = "",
    min,
    max,
    emptyText = "Não definido",
    labelSlot,
    formGroup,
    onValueChange,
    onSave,
  }: {
    value?: string | number | boolean | null;
    label: string;
    caption?: string;
    type?: "text" | "currency" | "number" | "select";
    options?: EditableFieldSelectOption[];
    disabled?: boolean;
    nested?: boolean;
    displayFormatter?: (value: unknown) => string;
    modalTitle?: string;
    modalDescription?: string;
    inputLabel?: string;
    inputPlaceholder?: string;
    min?: number | string;
    max?: number | string;
    emptyText?: string;
    /** Substitui o `#label` slot do item (HTML custom com badge etc). */
    labelSlot?: Snippet;
    /** Wrapper do campo dentro do modal. Default: label + input (classe `demo-form-group`). */
    formGroup?: Snippet<[{ label: string; input: Snippet }]>;
    onValueChange?: (value: string | number | boolean | null) => void;
    onSave?: (value: string | number | boolean | null) => void;
  } = $props();

  let modal: ArcanaEditFieldDialog;
  let bufferValue = $state<string | number | boolean | null>(null);

  const isEmpty = $derived(value === null || value === undefined || value === "");

  const displayValue = $derived.by(() => {
    if (isEmpty) return emptyText;
    if (displayFormatter) return displayFormatter(value);
    if (type === "currency") return CurrencyFormatter.format(value as number);
    if (type === "select") {
      const opt = options.find((o) => o.value === value);
      return opt?.label ?? String(value);
    }
    return String(value);
  });

  const valueClasses = $derived(
    [
      "arcana-settings-list__current-value",
      isEmpty ? "arcana-settings-list__current-value--empty" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );

  const resolvedModalTitle = $derived(modalTitle || `Alterar ${label}`);
  const resolvedInputLabel = $derived(inputLabel || label);

  function openModal() {
    bufferValue = value;
    modal?.show();
  }

  function handleSave() {
    onValueChange?.(bufferValue);
    onSave?.(bufferValue);
    modal?.hide();
  }
</script>

{#snippet inputSnippet()}
  {#if type === "text"}
    <ArcanaInput
      value={bufferValue as string | number | null}
      placeholder={inputPlaceholder}
      onValueChange={(v) => (bufferValue = v)}
    />
  {:else if type === "currency"}
    <ArcanaInputCurrency
      value={bufferValue as string | number}
      onValueChange={(v) => (bufferValue = v)}
    />
  {:else if type === "number"}
    <ArcanaInput
      value={bufferValue as string | number | null}
      type="number"
      {min}
      {max}
      placeholder={inputPlaceholder}
      onValueChange={(v) => (bufferValue = v)}
    />
  {:else if type === "select"}
    <ArcanaSelect
      value={bufferValue}
      {options}
      onValueChange={(v) => (bufferValue = v as string | number | boolean | null)}
    />
  {/if}
{/snippet}

<ArcanaSettingsListItem label={labelSlot ?? label} {caption} {disabled} {nested}>
  <span class={valueClasses}>{displayValue}</span>
  <button
    class="arcana-settings-list__edit-btn"
    type="button"
    {disabled}
    onclick={openModal}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
    Alterar
  </button>

  <ArcanaEditFieldDialog
    bind:this={modal}
    title={resolvedModalTitle}
    description={modalDescription}
    onSave={handleSave}
  >
    {#if formGroup}
      {@render formGroup({ label: resolvedInputLabel, input: inputSnippet })}
    {:else}
      <div class="demo-form-group">
        {#if resolvedInputLabel}
          <label class="demo-form-group__label">{resolvedInputLabel}</label>
        {/if}
        {@render inputSnippet()}
      </div>
    {/if}
  </ArcanaEditFieldDialog>
</ArcanaSettingsListItem>
