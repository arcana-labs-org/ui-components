<script lang="ts" module>
  const DECIMAL = ",";
  const THOUSANDS = ".";

  export function digitsFromValue(
    v: string | number | undefined,
    precision: number
  ): string {
    if (v == null || v === "") return "";
    if (typeof v === "number") {
      return String(Math.round(Math.abs(v) * Math.pow(10, precision)));
    }
    const s = String(v);
    if (s.includes(DECIMAL)) return s.replace(/\D/g, "");
    const n = parseFloat(s);
    if (!isFinite(n)) return s.replace(/\D/g, "");
    return String(Math.round(Math.abs(n) * Math.pow(10, precision)));
  }

  export function formatDigits(digits: string, precision: number, prefix: string): string {
    let d = digits.replace(/\D/g, "");
    if (!d) d = "0";
    if (precision > 0) d = d.padStart(precision + 1, "0");
    const cut = precision > 0 ? d.length - precision : d.length;
    let intPart = d.slice(0, cut).replace(/^0+(?=\d)/, "");
    const fracPart = precision > 0 ? d.slice(cut) : "";
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS);
    return prefix + intPart + (precision > 0 ? DECIMAL + fracPart : "");
  }
</script>

<script lang="ts">
  /**
   * `<ArcanaInputCurrency>` — Svelte 5 port. Input de moeda BRL.
   *
   * Decisão sobre a lib (parity com React/Angular): o SFC usa `v-money3` (Vue-only). Em
   * vez de adicionar dep, reimplementamos a máscara de moeda equivalente (mesma UX
   * right-to-left: dígitos preenchem a partir dos centavos), mantendo markup/classes
   * (`icur-arcana-field`/`icur-arcana-input` no modo shadcn; `input-group`/`form-control`
   * no modo Bootstrap). Como o v-money3 default (sem `masked:false`), o `modelValue`
   * emitido é a STRING mascarada BRL (ex. `"1.234,56"`).
   *
   * Equivalências: `modelValue` → `value` + `onValueChange`; `emit('change'|'enter'|'blur')`
   * → `onChange`/`onEnter`/`onBlur`; slots `#prepend`/`#append` → snippets `prepend`/`append`.
   */
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { CurrencyFormatter } from "../core/currency";

  let {
    value = "",
    disabled = false,
    fraction = 2,
    name,
    showIcon = true,
    prefix = "",
    icon = "icon-coin-dollar",
    formatCurrency = true,
    shadcn = false,
    prepend,
    append,
    onValueChange,
    onChange,
    onEnter,
    onBlur,
    class: className = "",
  }: {
    value?: string | number;
    disabled?: boolean | number;
    allowBlank?: boolean;
    fraction?: number;
    name?: string;
    showIcon?: boolean;
    prefix?: string;
    icon?: string;
    max?: number;
    min?: number;
    formatCurrency?: boolean;
    shadcn?: boolean;
    prepend?: Snippet;
    append?: Snippet;
    onValueChange?: (value: string) => void;
    onChange?: (ev: unknown) => void;
    onEnter?: (ev: KeyboardEvent) => void;
    onBlur?: (ev: FocusEvent) => void;
    class?: string;
  } = $props();

  const isDisabled = $derived(Boolean(disabled));

  let display = $state(formatDigits(digitsFromValue(value, fraction), fraction, prefix));

  // Reflete mudança externa do `value` no display (load/reset). Compara pelos dígitos.
  $effect(() => {
    const incoming = digitsFromValue(value, fraction);
    const fr = fraction;
    const pf = prefix;
    untrack(() => {
      const current = display.replace(/\D/g, "");
      if (incoming.replace(/^0+(?=\d)/, "") !== current.replace(/^0+(?=\d)/, "")) {
        display = formatDigits(incoming, fr, pf);
      }
    });
  });

  const formattedCurrency = $derived(formatCurrency ? CurrencyFormatter.format(value || 0) : value);

  function onInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const digits = raw.replace(/\D/g, "");
    const formatted = formatDigits(digits, fraction, prefix);
    display = formatted;
    onValueChange?.(formatted);
  }

  const inputClasses = $derived(
    [
      shadcn ? "icur-arcana-input" : "form-control",
      shadcn && showIcon ? "has-icon" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const wrapClasses = $derived(
    shadcn
      ? ["icur-arcana-field", isDisabled ? "is-disabled" : ""].filter(Boolean).join(" ")
      : showIcon
        ? "input-group"
        : ""
  );
</script>

<div class={wrapClasses || undefined}>
  {#if prepend}
    {@render prepend()}
  {:else}
    {#if showIcon && !shadcn}
      <span class="input-group-addon"><i class={icon}></i></span>
    {/if}
    {#if showIcon && shadcn}
      <span class="icur-arcana-field__icon"><i class={icon}></i></span>
    {/if}
  {/if}

  {#if !isDisabled}
    <input
      type="text"
      class={inputClasses}
      {name}
      value={display}
      oninput={onInput}
      onkeyup={(e) => {
        if (e.key === "Enter") onEnter?.(e);
      }}
      onblur={(e) => {
        onChange?.(display);
        onBlur?.(e);
      }}
    />
  {:else}
    <input
      disabled
      class={[
        shadcn ? "icur-arcana-input" : "form-control",
        shadcn && showIcon ? "has-icon" : "",
        "full-width",
      ]
        .filter(Boolean)
        .join(" ")}
      type="text"
      value={String(formattedCurrency)}
      readonly
    />
  {/if}

  {#if append}{@render append()}{/if}
</div>
