<script lang="ts">
  /**
   * `<ArcanaInputBoolean>` — Svelte 5 port. Renderiza um `<ArcanaSelect>` com opções
   * Sim/Não (ou Ativo/Inativo, ou IS_NOT_NULL/IS_NULL) + "Todos" opcional, idêntico ao SFC.
   *
   * Equivalências (parity com React): `modelValue` → `value` + `onValueChange`;
   * `emit('change')` → `onChange`; `normalizedValue`/`onChange` preservados.
   */
  import ArcanaSelect, { type SelectOption } from "./ArcanaSelect.svelte";

  let {
    value = undefined,
    variation = "",
    disabled = false,
    clearable = true,
    placeholder = "Selecione…",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: unknown;
    variation?: "" | "status" | "nullable" | string;
    disabled?: boolean | number;
    clearable?: boolean;
    placeholder?: string;
    onValueChange?: (value: unknown) => void;
    onChange?: (value: unknown) => void;
    class?: string;
  } = $props();

  const yesText = $derived(variation === "status" ? "Ativo" : "Sim");
  const noText = $derived(variation === "status" ? "Inativo" : "Não");
  const yesValue = $derived<string | number>(variation === "nullable" ? "IS_NOT_NULL" : 1);
  const noValue = $derived<string | number>(variation === "nullable" ? "IS_NULL" : 0);

  const options = $derived.by<SelectOption[]>(() => {
    const opts: SelectOption[] = [
      { label: yesText, value: yesValue },
      { label: noText, value: noValue },
    ];
    if (clearable) opts.unshift({ label: "Todos", value: null });
    return opts;
  });

  const normalizedValue = $derived.by<unknown>(() => {
    if (value === true) return variation === "nullable" ? "IS_NOT_NULL" : 1;
    if (value === false) return variation === "nullable" ? "IS_NULL" : 0;
    return value;
  });

  function handleChange(v: unknown) {
    onValueChange?.(v);
    onChange?.(v);
  }
</script>

<ArcanaSelect
  value={normalizedValue}
  {options}
  disabled={Boolean(disabled)}
  {placeholder}
  onValueChange={handleChange}
  class={className}
/>
