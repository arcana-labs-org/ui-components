<script lang="ts">
  /**
   * `<ArcanaDatePicker>` — Svelte 5 (runes) port do SFC Vue novo: input de data
   * arcana-styled com um calendário PRÓPRIO, auto-contido e SEM Element Plus.
   *
   * O calendário é desenhado à mão (grid 6×7 Sunday-first) num painel portado pro
   * `<body>` (action `use:portal`), posicionado por `placePanel` e fechado em
   * click-fora / Escape / scroll / resize. Toda a matemática de datas vem de
   * `core/calendar.ts` e a localização (meses/dias/textos) de `core/calendar-locale.ts`.
   * MESMAS classes `.arcana-cal__*` dos ports Vue/React/Angular.
   *
   * Cinco modos via prop `type`, cada um com um formato de valor canônico:
   * - `date`      (default) → string `'YYYY-MM-DD'`  — 1 painel de dias.
   * - `month`               → string `'YYYY-MM'`     — grid 4×3 de meses.
   * - `year`                → string `'YYYY'`        — grid de 12 anos (década).
   * - `daterange`           → `['YYYY-MM-DD','YYYY-MM-DD']` — 2 painéis + range.
   * - `datetime`            → string `'YYYY-MM-DD HH:mm'` — dias + hora + Confirmar.
   *
   * Convenção de reatividade (parity com o port React, NÃO `$bindable`):
   * `modelValue` (v-model) → prop `value` + callback `onValueChange`; o `change` do
   * Vue vira o callback separado `onChange`.
   */
  import {
    addMonths, decadeGrid, formatDateTime, formatYear, formatYm, formatYmd,
    isBetweenYmd, monthGrid, parseDateTime, parseYear, parseYm, parseYmd, sortRange,
    toDisplayDate, toDisplayDateTime, toDisplayMonth
  } from "../core/calendar";
  import type { CalendarDay } from "../core/calendar";
  import {
    calendarMonthLabels, calendarMonthLabelsShort, calendarWeekdayLabels,
    resolveCalendarMessages, type CalendarMessages
  } from "../core/calendar-locale";
  import { placePanel } from "../core/popover";
  import { portal } from "./portal";

  type PickerType = "date" | "month" | "year" | "daterange" | "datetime";
  type PickerValue = string | string[] | null;

  let {
    value = null,
    type = "date",
    disabled = false,
    placeholder,
    clearable = true,
    ariaLabel,
    size = "md",
    locale = "pt-BR",
    messages,
    onValueChange,
    onChange,
  }: {
    value?: PickerValue;
    type?: PickerType;
    disabled?: boolean;
    placeholder?: string;
    clearable?: boolean;
    ariaLabel?: string;
    size?: "sm" | "md" | "lg";
    /** Locale BCP-47 dos nomes de meses/dias (via Intl). Default `'pt-BR'`. */
    locale?: string;
    /** Override parcial dos textos do calendário (clear, nav, confirmar, placeholders). */
    messages?: Partial<CalendarMessages>;
    onValueChange?: (value: PickerValue) => void;
    onChange?: (value: PickerValue) => void;
  } = $props();

  const msg = $derived<CalendarMessages>(resolveCalendarMessages(messages));
  const monthLabels = $derived(calendarMonthLabels(locale));
  const monthLabelsShort = $derived(calendarMonthLabelsShort(locale));
  const weekdayLabels = $derived(calendarWeekdayLabels(locale));

  const isRange = $derived(type === "daterange");

  const PANEL_ESTIMATE: Record<PickerType, { width: number; height: number }> = {
    date: { width: 252, height: 300 },
    month: { width: 252, height: 210 },
    year: { width: 252, height: 210 },
    daterange: { width: 520, height: 300 },
    datetime: { width: 252, height: 348 }
  };

  let isOpen = $state(false);
  let panelStyle = $state("");
  let view = $state({ year: 2000, month: 1 });
  let pendingStart = $state<string | null>(null);
  let hoverYmd = $state<string | null>(null);
  let todayYmd = $state("");
  /** datetime: dia selecionado (ainda não confirmado) + hora/minuto pendentes. */
  let dtDay = $state<string | null>(null);
  let dtHour = $state(0);
  let dtMinute = $state(0);
  let trigger: HTMLButtonElement | null = $state(null);
  let panel: HTMLDivElement | null = $state(null);

  const rangeValue = $derived.by<[string, string]>(() => {
    if (!isRange) return ["", ""];
    const pair = Array.isArray(value) ? value : ["", ""];
    return [String(pair[0] ?? ""), String(pair[1] ?? "")];
  });
  const singleValue = $derived(isRange ? "" : String(value ?? ""));

  const hasValue = $derived(isRange ? Boolean(rangeValue[0] || rangeValue[1]) : singleValue !== "");
  const canClear = $derived(clearable && !disabled && hasValue);

  const placeholderText = $derived.by(() => {
    if (placeholder) return placeholder;
    switch (type) {
      case "month": return msg.monthPlaceholder;
      case "year": return msg.yearPlaceholder;
      case "daterange": return msg.rangePlaceholder;
      case "datetime": return msg.datetimePlaceholder;
      default: return msg.datePlaceholder;
    }
  });

  const displayLabel = $derived.by(() => {
    if (isRange) {
      if (!hasValue) return placeholderText;
      return `${toDisplayDate(rangeValue[0]) || "…"} → ${toDisplayDate(rangeValue[1]) || "…"}`;
    }
    switch (type) {
      case "month": return toDisplayMonth(singleValue) || placeholderText;
      case "year": {
        const year = parseYear(singleValue);
        return year != null ? formatYear(year) : placeholderText;
      }
      case "datetime": return toDisplayDateTime(singleValue) || placeholderText;
      default: return toDisplayDate(singleValue) || placeholderText;
    }
  });

  /* ─────────────────────────── placement / lifecycle ─────────────────────── */

  function reposition() {
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    const estimate = PANEL_ESTIMATE[type];
    const place = placePanel(rect,
      { width: panel.offsetWidth || estimate.width, height: panel.offsetHeight || estimate.height },
      { width: window.innerWidth, height: window.innerHeight }, {});
    panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px`;
  }

  function open() {
    if (disabled || isOpen) return;
    const now = new Date();
    todayYmd = formatYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());

    // Anchor the initial view on the current value (per mode) or on today.
    let anchor: { year: number; month: number } | null = null;
    if (isRange) anchor = parseYmd(rangeValue[0]);
    else if (type === "month") anchor = parseYm(singleValue);
    else if (type === "year") { const y = parseYear(singleValue); anchor = y != null ? { year: y, month: 1 } : null; }
    else if (type === "datetime") { const dt = parseDateTime(singleValue); anchor = dt ? { year: dt.year, month: dt.month } : null; }
    else anchor = parseYmd(singleValue);
    view = anchor ? { year: anchor.year, month: anchor.month } : { year: now.getFullYear(), month: now.getMonth() + 1 };

    pendingStart = null;
    hoverYmd = null;

    // datetime: seed the pending day + time from the current value, else today/00:00.
    if (type === "datetime") {
      const dt = parseDateTime(singleValue);
      dtDay = dt ? formatYmd(dt.year, dt.month, dt.day) : todayYmd;
      dtHour = dt ? dt.hour : 0;
      dtMinute = dt ? dt.minute : 0;
    }

    const rect = trigger?.getBoundingClientRect();
    if (rect) {
      const place = placePanel(rect, PANEL_ESTIMATE[type], { width: window.innerWidth, height: window.innerHeight }, {});
      panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px`;
    }
    isOpen = true;
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    pendingStart = null;
    hoverYmd = null;
    trigger?.focus({ preventScroll: true });
  }

  $effect(() => {
    if (!isOpen) return;
    reposition();
    panel?.focus({ preventScroll: true });
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as globalThis.Node;
      if (trigger?.contains(target) || panel?.contains(target)) return;
      close();
    };
    const onScroll = (event: Event) => {
      if (event.target instanceof globalThis.Node && panel?.contains(event.target)) return;
      close();
    };
    const onResize = () => reposition();
    const onDocKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("mousedown", onMouseDown, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onDocKeydown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onDocKeydown);
    };
  });

  function emitValue(next: PickerValue) {
    onValueChange?.(next);
    onChange?.(next);
  }

  function clear(event: MouseEvent) {
    event.stopPropagation();
    if (disabled) return;
    emitValue(isRange ? ["", ""] : "");
  }

  /* ───────────────────────────── navigation ─────────────────────────────── */

  function navMonths(delta: number) { view = addMonths(view.year, view.month, delta); }
  function navYears(delta: number) { view = { year: view.year + delta, month: view.month }; }

  const decadeCells = $derived(decadeGrid(view.year));
  const decadeStart = $derived(Math.floor(view.year / 10) * 10);
  const decadeTitle = $derived(`${decadeStart} - ${decadeStart + 9}`);

  /* ───────────────────────────── selection ──────────────────────────────── */

  function pickDay(ymd: string) {
    if (type === "date") { emitValue(ymd); close(); return; }
    if (type === "datetime") { dtDay = ymd; return; }
    // daterange
    if (!pendingStart) { pendingStart = ymd; hoverYmd = null; return; }
    emitValue(sortRange(pendingStart, ymd));
    close();
  }

  function pickMonth(month: number) { emitValue(formatYm(view.year, month)); close(); }
  function pickYear(year: number) { emitValue(formatYear(year)); close(); }

  const clampInt = (val: number, min: number, max: number) =>
    Number.isFinite(val) ? Math.min(max, Math.max(min, Math.trunc(val))) : min;

  function onHourInput(event: Event) { dtHour = clampInt(Number((event.target as HTMLInputElement).value), 0, 23); }
  function onMinuteInput(event: Event) { dtMinute = clampInt(Number((event.target as HTMLInputElement).value), 0, 59); }

  function confirmDateTime() {
    const day = parseYmd(dtDay ?? todayYmd) ?? parseYmd(todayYmd);
    if (!day) return;
    emitValue(formatDateTime(day.year, day.month, day.day, dtHour, dtMinute));
    close();
  }

  /* ───────────────────────────── highlighting ───────────────────────────── */

  // Range: while picking, preview from the anchored start to the hovered day;
  // otherwise show the committed value.
  const highlightRange = $derived.by<[string, string] | null>(() => {
    if (!isRange) return null;
    if (pendingStart) return hoverYmd ? sortRange(pendingStart, hoverYmd) : [pendingStart, pendingStart];
    return parseYmd(rangeValue[0]) && parseYmd(rangeValue[1]) ? [rangeValue[0], rangeValue[1]] : null;
  });

  function dayClasses(cell: CalendarDay): string {
    const range = highlightRange;
    const inHighlight = Boolean(range && cell.inMonth && isBetweenYmd(cell.ymd, range[0], range[1]));
    const isEdge = Boolean(range && cell.inMonth && (cell.ymd === range[0] || cell.ymd === range[1]));
    let isSelected = false;
    if (type === "date") isSelected = cell.ymd === singleValue;
    else if (type === "datetime") isSelected = cell.ymd === dtDay;
    else isSelected = isEdge;
    const classes = ["arcana-cal__day"];
    if (!cell.inMonth) classes.push("arcana-cal__day--adjacent");
    if (cell.ymd === todayYmd) classes.push("arcana-cal__day--today");
    if (inHighlight && !isEdge) classes.push("arcana-cal__day--in-range");
    if (isSelected) classes.push("arcana-cal__day--selected");
    if (range && cell.ymd === range[0] && cell.inMonth) classes.push("arcana-cal__day--range-start");
    if (range && cell.ymd === range[1] && cell.inMonth) classes.push("arcana-cal__day--range-end");
    return classes.join(" ");
  }

  function monthClasses(month: number): string {
    const selected = parseYm(singleValue);
    const now = parseYmd(todayYmd);
    const classes = ["arcana-cal__month"];
    if (selected && selected.year === view.year && selected.month === month) classes.push("arcana-cal__month--selected");
    if (now && now.year === view.year && now.month === month) classes.push("arcana-cal__month--today");
    return classes.join(" ");
  }

  function yearClasses(year: number): string {
    const selected = parseYear(singleValue);
    const now = parseYmd(todayYmd);
    const classes = ["arcana-cal__year"];
    if (year < decadeStart || year > decadeStart + 9) classes.push("arcana-cal__year--adjacent");
    if (selected === year) classes.push("arcana-cal__year--selected");
    if (now && now.year === year) classes.push("arcana-cal__year--today");
    return classes.join(" ");
  }

  function onDayHover(cell: CalendarDay) {
    if (isRange && pendingStart) hoverYmd = cell.ymd;
  }

  function onPanelKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Tab") { event.preventDefault(); close(); }
  }
</script>

{#snippet daysPanel(offset: number)}
  {@const panelMonth = addMonths(view.year, view.month, offset)}
  {@const cells = monthGrid(panelMonth.year, panelMonth.month)}
  <div class="arcana-cal__month-panel">
    <div class="arcana-cal__header">
      {#if !isRange || offset === 0}
        <button type="button" class="arcana-cal__nav" aria-label={msg.prevYear} onclick={() => navMonths(-12)}>«</button>
        <button type="button" class="arcana-cal__nav" aria-label={msg.prevMonth} onclick={() => navMonths(-1)}>‹</button>
      {:else}
        <span class="arcana-cal__nav-spacer"></span>
      {/if}
      <span class="arcana-cal__title">{monthLabels[panelMonth.month - 1]} {panelMonth.year}</span>
      {#if !isRange || offset === 1}
        <button type="button" class="arcana-cal__nav" aria-label={msg.nextMonth} onclick={() => navMonths(1)}>›</button>
        <button type="button" class="arcana-cal__nav" aria-label={msg.nextYear} onclick={() => navMonths(12)}>»</button>
      {:else}
        <span class="arcana-cal__nav-spacer"></span>
      {/if}
    </div>
    <div class="arcana-cal__weekdays">
      {#each weekdayLabels as label, index (index)}
        <span class="arcana-cal__weekday">{label}</span>
      {/each}
    </div>
    <div class="arcana-cal__grid">
      {#each cells as cell (cell.ymd)}
        <button
          type="button"
          class={dayClasses(cell)}
          aria-label={toDisplayDate(cell.ymd)}
          onmouseenter={() => onDayHover(cell)}
          onclick={() => pickDay(cell.ymd)}
        >{cell.day}</button>
      {/each}
    </div>

    {#if type === "datetime"}
      <div class="arcana-cal__time">
        <span class="arcana-cal__time-label">{msg.time}</span>
        <input type="number" class="arcana-cal__time-input" min="0" max="23" value={dtHour} aria-label="HH" oninput={onHourInput} />
        <span class="arcana-cal__time-sep">:</span>
        <input type="number" class="arcana-cal__time-input" min="0" max="59" value={dtMinute} aria-label="mm" oninput={onMinuteInput} />
        <button type="button" class="arcana-cal__confirm" onclick={confirmDateTime}>{msg.confirm}</button>
      </div>
    {/if}
  </div>
{/snippet}

{#snippet monthsPanel()}
  <div class="arcana-cal__month-panel">
    <div class="arcana-cal__header">
      <button type="button" class="arcana-cal__nav" aria-label={msg.prevYear} onclick={() => navYears(-1)}>«</button>
      <span class="arcana-cal__title">{view.year}</span>
      <button type="button" class="arcana-cal__nav" aria-label={msg.nextYear} onclick={() => navYears(1)}>»</button>
    </div>
    <div class="arcana-cal__months">
      {#each monthLabelsShort as label, index (label)}
        <button type="button" class={monthClasses(index + 1)} onclick={() => pickMonth(index + 1)}>{label}</button>
      {/each}
    </div>
  </div>
{/snippet}

{#snippet yearsPanel()}
  <div class="arcana-cal__month-panel">
    <div class="arcana-cal__header">
      <button type="button" class="arcana-cal__nav" aria-label={msg.prevDecade} onclick={() => navYears(-10)}>«</button>
      <span class="arcana-cal__title">{decadeTitle}</span>
      <button type="button" class="arcana-cal__nav" aria-label={msg.nextDecade} onclick={() => navYears(10)}>»</button>
    </div>
    <div class="arcana-cal__years">
      {#each decadeCells as year (year)}
        <button type="button" class={yearClasses(year)} onclick={() => pickYear(year)}>{year}</button>
      {/each}
    </div>
  </div>
{/snippet}

<div class={`arcana-cal arcana-cal--${size}${disabled ? " arcana-cal--disabled" : ""}`}>
  <button
    bind:this={trigger}
    type="button"
    class={`arcana-cal__input${isOpen ? " arcana-cal__input--open" : ""}${canClear ? " arcana-cal__input--has-clear" : ""}`}
    {disabled}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    aria-label={ariaLabel}
    onclick={() => (isOpen ? close() : open())}
  >
    <svg class="arcana-cal__input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
    <span class={`arcana-cal__input-label${hasValue ? "" : " arcana-cal__input-label--placeholder"}`}>{displayLabel}</span>
    {#if canClear}
      <span class="arcana-cal__clear" role="button" tabindex="-1" aria-label={msg.clear} onclick={clear}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </span>
    {/if}
  </button>

  {#if isOpen}
    <div
      use:portal
      bind:this={panel}
      class={`arcana-cal__panel${isRange ? " arcana-cal__panel--range" : ""}`}
      style={panelStyle}
      role="dialog"
      aria-label={ariaLabel}
      tabindex="-1"
      onkeydown={onPanelKeydown}
    >
      <div class="arcana-cal__panels">
        {#if type === "month"}
          {@render monthsPanel()}
        {:else if type === "year"}
          {@render yearsPanel()}
        {:else if isRange}
          {@render daysPanel(0)}
          {@render daysPanel(1)}
        {:else}
          {@render daysPanel(0)}
        {/if}
      </div>
    </div>
  {/if}
</div>
