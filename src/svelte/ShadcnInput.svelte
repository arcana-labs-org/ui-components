<script lang="ts">
  /**
   * `<ShadcnInput>` — Svelte 5 port. `<input class="shadcn-input shadcn-input--${size}">`
   * (+ `shadcn-input--disabled`), idêntico ao SFC Vue.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` (controlada) + `onValueChange` (dispara a cada
   *   digitação; equivale a `emit('update:modelValue')`)
   * - `emit('change')` (evento `change` nativo — blur/enter) → `onChange` (usa o `onchange`
   *   nativo do input, preservando a semântica Vue)
   * - `blur`/`focus`/`keydown`/`keyup` → `onBlur`/`onFocus`/`onKeydown`/`onKeyup`
   *
   * Pra `type="number"`, converte string vazia → null e valor válido → number.
   */
  let {
    value = "",
    type = "text",
    placeholder = "",
    disabled = false,
    readonly = false,
    min,
    max,
    step,
    maxlength,
    autocomplete,
    name,
    size = "md",
    onValueChange,
    onChange,
    onBlur,
    onFocus,
    onKeydown,
    onKeyup,
    class: className = "",
  }: {
    value?: string | number | null;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    maxlength?: string | number;
    autocomplete?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string | number | null) => void;
    onChange?: (value: string | number | null) => void;
    onBlur?: (ev: FocusEvent) => void;
    onFocus?: (ev: FocusEvent) => void;
    onKeydown?: (ev: KeyboardEvent) => void;
    onKeyup?: (ev: KeyboardEvent) => void;
    class?: string;
  } = $props();

  function parseValue(raw: string): string | number | null {
    if (type !== "number") return raw;
    if (raw === "" || raw === null || raw === undefined) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? raw : n;
  }

  const rootClasses = $derived(
    ["shadcn-input", `shadcn-input--${size}`, disabled ? "shadcn-input--disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );
</script>

<input
  {type}
  value={value ?? ""}
  {placeholder}
  {disabled}
  {readonly}
  {min}
  {max}
  {step}
  {maxlength}
  {autocomplete}
  {name}
  class={rootClasses}
  oninput={(e) => onValueChange?.(parseValue((e.target as HTMLInputElement).value))}
  onchange={(e) => onChange?.(parseValue((e.target as HTMLInputElement).value))}
  onblur={(e) => onBlur?.(e)}
  onfocus={(e) => onFocus?.(e)}
  onkeydown={(e) => onKeydown?.(e)}
  onkeyup={(e) => onKeyup?.(e)}
/>
