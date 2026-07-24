<script lang="ts">
  /**
   * `<ShadcnNumberStepper>` — Svelte 5 port. Reproduz `<div class="shadcn-number-stepper">`
   * (+ `is-disabled`), os `__btn--decrement`/`__btn--increment` e o `__input`, idêntico ao SFC.
   *
   * Equivalências (parity com React): `modelValue` → `value` + `onValueChange`;
   * `emit('change')` → `onChange`.
   */
  let {
    value = 0,
    min = 0,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    disabled = false,
    ariaLabel = "",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: number | string | null;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    ariaLabel?: string;
    onValueChange?: (value: number | null) => void;
    onChange?: (value: number) => void;
    class?: string;
  } = $props();

  const currentValue = $derived.by(() => {
    const n = Number(value);
    return Number.isFinite(n) ? n : min;
  });

  const cannotDecrement = $derived(disabled || currentValue <= min);
  const cannotIncrement = $derived(disabled || currentValue >= max);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  function emitValue(v: number) {
    const clamped = clamp(v);
    onValueChange?.(clamped);
    onChange?.(clamped);
  }

  function increment() {
    if (cannotIncrement) return;
    emitValue(currentValue + step);
  }

  function decrement() {
    if (cannotDecrement) return;
    emitValue(currentValue - step);
  }

  function onInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    if (raw === "") {
      onValueChange?.(null);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) emitValue(n);
  }

  function onBlur() {
    const n = Number(value);
    const final = Number.isFinite(n) ? clamp(n) : min;
    if (final !== Number(value)) {
      onValueChange?.(final);
      onChange?.(final);
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  }

  const rootClasses = $derived(
    ["shadcn-number-stepper", disabled ? "is-disabled" : "", className]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={rootClasses}>
  <button
    type="button"
    class="shadcn-number-stepper__btn shadcn-number-stepper__btn--decrement"
    disabled={cannotDecrement}
    aria-label={"Diminuir " + (ariaLabel || "valor")}
    onclick={decrement}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>

  <input
    type="number"
    class="shadcn-number-stepper__input"
    value={value ?? ""}
    {min}
    max={Number.isFinite(max) ? max : undefined}
    {step}
    {disabled}
    aria-label={ariaLabel || undefined}
    oninput={onInput}
    onblur={onBlur}
    onkeydown={onKeydown}
  />

  <button
    type="button"
    class="shadcn-number-stepper__btn shadcn-number-stepper__btn--increment"
    disabled={cannotIncrement}
    aria-label={"Aumentar " + (ariaLabel || "valor")}
    onclick={increment}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>
</div>
