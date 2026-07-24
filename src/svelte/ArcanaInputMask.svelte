<script lang="ts">
  /**
   * `<ArcanaInputMask>` — Svelte 5 port. Input mascarado shadcn (`class="arcana-input"` +
   * `arcana-input--${size}`/`--disabled`), idêntico ao SFC.
   *
   * Decisão sobre a máscara (parity com React/Angular): o SFC usa a diretiva `v-maska`,
   * inexistente fora do Vue. Em vez de reimplementar a máscara, reusamos as funções CORE
   * da lib `maska` (`mask`/`tokens`), agnósticas de framework:
   *   - display formatado   = `mask(raw, maskStr, tokens)`         (masked = true)
   *   - raw sem separadores = `mask(raw, maskStr, tokens, false)`  (masked = false)
   * O `false` no 4º arg devolve o mesmo `maskRawValue` da diretiva → valor emitido idêntico.
   *
   * Equivalências: `modelValue` → `value` + `onValueChange` (sempre o raw);
   * `emit('blur'|'focus')` → `onBlur`/`onFocus`; watch(modelValue) → `$effect`.
   */
  import { untrack } from "svelte";
  import { mask as maskaMask, tokens as maskaTokens } from "maska";

  let {
    value = "",
    mask,
    placeholder = "",
    disabled = false,
    readonly = false,
    name,
    size = "md",
    onValueChange,
    onBlur,
    onFocus,
    class: className = "",
  }: {
    value?: string | number | null;
    mask: string | string[];
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    name?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent) => void;
    onFocus?: (ev: FocusEvent) => void;
    class?: string;
  } = $props();

  // `maska` aceita string única ou array stringificado (máscara dinâmica por tamanho).
  const maskStr = $derived(Array.isArray(mask) ? JSON.stringify(mask) : mask);

  // `tempValue` (display mascarado) ≠ raw emitido — igual ao SFC.
  let tempValue = $state(value ? maskaMask(String(value), maskStr, maskaTokens) : "");

  // Re-aplica a máscara quando o pai muda `value` (load/reset). Compara com o raw atual
  // do display pra evitar reformatar durante a própria digitação.
  $effect(() => {
    const incoming = value == null ? "" : String(value);
    const ms = maskStr;
    untrack(() => {
      const currentRaw = tempValue ? maskaMask(tempValue, ms, maskaTokens, false) : "";
      if (incoming !== currentRaw) {
        tempValue = incoming ? maskaMask(incoming, ms, maskaTokens) : "";
      }
    });
  });

  const rootClasses = $derived(
    [
      "arcana-input",
      `arcana-input--${size}`,
      disabled ? "arcana-input--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  function onInput(e: Event) {
    const typed = (e.target as HTMLInputElement).value;
    const display = maskaMask(typed, maskStr, maskaTokens);
    const raw = maskaMask(typed, maskStr, maskaTokens, false);
    tempValue = display;
    onValueChange?.(raw);
  }
</script>

<input
  class={rootClasses}
  {placeholder}
  {disabled}
  {readonly}
  {name}
  value={tempValue}
  oninput={onInput}
  onblur={onBlur}
  onfocus={onFocus}
/>
