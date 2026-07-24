<script lang="ts">
  /**
   * `<ShadcnDatePicker>` — Svelte 5 port. Input de data shadcn com máscara `DD/MM/AAAA`.
   *
   * Decisão sobre o calendário (parity com React/Angular): o SFC usa `<el-date-picker>`
   * (Element Plus) só como popover do calendário. Sem Element Plus, o calendário vem do
   * **date picker nativo** do browser: um `<input type="date">` escondido no `__picker-anchor`,
   * aberto pelo botão de ícone via `showPicker()` (fallback focus+click). A digitação
   * mascarada e a emissão de `YYYY-MM-DD` são IDÊNTICAS ao SFC; só o visual do calendário
   * difere. `type="date"` (default) usa esse composite; outros types caem num `<input>`
   * nativo do tipo correspondente (ranges nativos não existem → usa `type="date"`).
   *
   * Equivalências: `modelValue` → `value` + `onValueChange`; `emit('change')` → `onChange`;
   * watch(modelValue) → `$effect`.
   */
  import { mask as maskaMask, tokens as maskaTokens } from "maska";
  import { DateFormatter } from "../core/date";

  const DATE_MASK = "##/##/####";

  let {
    value = null,
    type = "date",
    disabled = false,
    placeholder = "",
    size = "md",
    onValueChange,
    onChange,
    onBlur,
    onFocus,
    class: className = "",
  }: {
    value?: string | string[] | null;
    type?: string;
    disabled?: boolean;
    clearable?: boolean;
    editable?: boolean;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    onValueChange?: (value: string | null) => void;
    onChange?: (value: string | null) => void;
    onBlur?: (ev: FocusEvent) => void;
    onFocus?: (ev: FocusEvent) => void;
    class?: string;
  } = $props();

  const isRange = $derived(String(type).includes("range"));
  const isComposite = $derived(type === "date");
  const nativeType = $derived(
    type === "month" || type === "monthrange"
      ? "month"
      : type === "year" || type === "yearrange"
        ? "number"
        : "date"
  );

  const toDisplay = (ymd: string): string => DateFormatter.fromDate(ymd) ?? "";

  let displayText = $state(value && typeof value === "string" ? toDisplay(value) : "");
  let lastEmitted: string | null = typeof value === "string" ? value : null;
  let nativeEl: HTMLInputElement | null = $state(null);

  $effect(() => {
    if (!isComposite) return;
    const v = typeof value === "string" ? value : null;
    if (v !== lastEmitted) {
      lastEmitted = v;
      displayText = v ? toDisplay(v) : "";
    }
  });

  function rawToYmd(raw: string): string | undefined {
    if (raw.length !== 8) return undefined;
    const d = raw.slice(0, 2),
      m = raw.slice(2, 4),
      y = raw.slice(4, 8);
    const dd = Number(d),
      mm = Number(m),
      yyyy = Number(y);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900) return undefined;
    const dt = new Date(yyyy, mm - 1, dd);
    if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd)
      return undefined;
    return `${y}-${m}-${d}`;
  }

  function emitValue(ymd: string | null) {
    lastEmitted = ymd;
    onValueChange?.(ymd);
    onChange?.(ymd);
  }

  function onTextChange(typed: string) {
    const display = maskaMask(typed, DATE_MASK, maskaTokens);
    displayText = display;
    const raw = maskaMask(typed, DATE_MASK, maskaTokens, false);
    if (raw.length === 0) {
      emitValue(null);
      return;
    }
    if (raw.length === 8) {
      const ymd = rawToYmd(raw);
      if (ymd) emitValue(ymd);
    }
  }

  function onTextBlur(event: FocusEvent) {
    onBlur?.(event);
    const raw = (displayText ?? "").replace(/\D/g, "");
    if (raw.length !== 8 || !rawToYmd(raw)) {
      displayText = typeof value === "string" && value ? toDisplay(value) : "";
    }
  }

  function openPicker() {
    if (disabled) return;
    const el = nativeEl;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch {
        /* alguns browsers exigem interação; cai no fallback abaixo */
      }
    }
    el.focus();
    el.click();
  }

  const rootClasses = $derived(
    [
      "shadcn-date-picker",
      disabled ? "is-disabled" : "",
      `shadcn-date-picker--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

{#if isComposite}
  <div class={rootClasses}>
    <div class="shadcn-date-picker__box">
      <div class="shadcn-date-picker__picker-anchor" aria-hidden="true">
        <input
          bind:this={nativeEl}
          type="date"
          value={typeof value === "string" ? value : ""}
          {disabled}
          tabindex="-1"
          onchange={(e) => emitValue((e.target as HTMLInputElement).value || null)}
        />
      </div>

      <input
        class="shadcn-date-picker__text"
        inputmode="numeric"
        value={displayText}
        placeholder="__/__/____"
        {disabled}
        oninput={(e) => onTextChange((e.target as HTMLInputElement).value)}
        onblur={onTextBlur}
        onfocus={onFocus}
      />

      <button
        type="button"
        class="shadcn-date-picker__icon-btn"
        {disabled}
        aria-label="Abrir calendário"
        onclick={openPicker}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </div>
  </div>
{:else}
  <div class={rootClasses}>
    <input
      class="shadcn-date-picker__text"
      type={nativeType}
      value={typeof value === "string" ? value : ""}
      {placeholder}
      {disabled}
      onchange={(e) => emitValue((e.target as HTMLInputElement).value || null)}
      onblur={onBlur}
      onfocus={onFocus}
    />
    {#if isRange}{/if}
  </div>
{/if}
